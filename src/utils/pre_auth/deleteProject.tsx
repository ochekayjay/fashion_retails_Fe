


export const DeleteProject = async(deleteId:any)=>{

    const token = window.localStorage.getItem('token')


        const deleted = await fetch(`https://fashion-r-services.onrender.com/content/delete/${deleteId}`,{
            method: 'DELETE',  
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            
                }
            })

        const finalData = await deleted.json()
        return finalData
}
