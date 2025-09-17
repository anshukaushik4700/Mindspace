import { Hono } from 'hono'
import {getPrisma} from '../lib/db'
import { sign } from 'hono/jwt'
import bcrypt from 'bcryptjs'
import { sendOtpEmail } from '../utils/sendOtpEmail'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET:string,
    SENDINBLUE_API_KEY: string;
  },
  Variables: {
    userId: string
  }
}>()

userRouter.options('*', (c) => {
  return c.json({}, { 
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    } 
  })
})



userRouter.post('/signup', async (c) => {
  const body = await c.req.json()
  const prisma = getPrisma(c.env.DATABASE_URL)
  
  try {
     const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    })
    if (existingUser) {
      c.status(400)
      return c.json({ message: 'Email already registered' },{
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        }
      })
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000) 
    const hashedpass = await bcrypt.hash(body.password,10)

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedpass,
        name: body.name,
        otp,            
        otpExpiry, 
        isVerified: false,  
      }
    })
    await sendOtpEmail(user.email,body.name, otp, c.env.SENDINBLUE_API_KEY)

    
    return c.json({message: "OTP sent to email. Please verify before login.",
      email: user.email
     },{
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      }
    })

  } catch (e) {
    console.error(e)
    return c.json({ message: "Signup failed" },{
       status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      }
    })
  }
})

userRouter.post("/verify-otp", async (c) => {
  const body = await c.req.json()
  const prisma = getPrisma(c.env.DATABASE_URL)

  try {
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    })

    if (!user) {
      c.status(404)
      return c.json({ message: "User not found" }, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        }
      })
    }

    if (user.isVerified) {
      return c.json({ message: "User already verified" }, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        }
      })
    }

    if (!user.otp || !user.otpExpiry) {
      c.status(400)
      return c.json({ message: "OTP not generated" }, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        }
      })
    }

    if (user.otp !== body.otp) {
      c.status(400)
      return c.json({ message: "Invalid OTP" }, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        }
      })
    }

    if (new Date() > user.otpExpiry) {
      c.status(400)
      return c.json({ message: "OTP expired" }, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        }
      })
    }

    const updatedUser = await prisma.user.update({
      where: { email: body.email },
      data: {
        isVerified: true,
        otp: null,
        otpExpiry: null,
      },
    })

    const token = await sign(
      {
        id: updatedUser.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      c.env.JWT_SECRET
    )

    return c.json({
      message: "User verified successfully",
      token,
      user: updatedUser,
    }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      }
    })
  } catch (e) {
    c.status(500)
    return c.json({ message: "OTP verification failed" }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      }
    })
  }
})




userRouter.post('/signin',async (c) => {
  const body = await c.req.json();
  const prisma = getPrisma(c.env.DATABASE_URL)

  try {
    const user = await prisma.user.findUnique({
      where:{
        email:body.email
      }
    })

    if(!user){
      c.status(401)
      return c.json({message : "user dont exist"},{
         status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        }
      })
    }

    if (!user.isVerified) {
      c.status(403)
      return c.json({ message: "Please verify your email first" })
    }

    const ispassvalid = await bcrypt.compare(body.password,user.password)
     if (!ispassvalid) {
      c.status(401)
      return c.json({ message: 'Invalid password' })
    }

    
    const token = await sign({id: user.id , exp: Math.floor(Date.now() / 1000) + 60 * 60 },c.env.JWT_SECRET)
    return c.json({token,user},{
       headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      }
    })
    
  } catch (e) {
    console.log(e)
    c.status(403)
    return c.json({message : "signin failed"},{
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      }
    })
  }

})

