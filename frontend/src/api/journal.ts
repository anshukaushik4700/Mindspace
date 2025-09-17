export const submitjournal = async (
    journalData:{
    howWasYourDay?: string
    howAreYouFeeling?: string
    whatWasGoodToday?: string
    }
) => {
    try {
        const token = localStorage.getItem("token")
        console.log(token)
        if(!token){
            throw new Error("Please signin first !")
        }

        const res = await fetch("https://mental-health-backend.anshukaushik4700.workers.dev/journals",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(journalData)
        })

        if(!res.ok){
            const errorData = await res.json()
            throw new Error(errorData.message || "Failed to create journal")
        }
        return await res.json()
    } catch (error:any) {
        console.error("Error submitting Journal ",error.message)
        throw error
    }
}