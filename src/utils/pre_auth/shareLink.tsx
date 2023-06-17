const ShareLink = async(obj:any)=>{
    console.log(obj)
    let shareObj = {title:obj.title,description:obj.projectDescription,link:obj.link}
    let convertedObj = `title: ${shareObj.title}\ndescription: ${shareObj.description}\nurl: ${encodeURI(shareObj.link)}`
    const entireObj = {
      title: 'Link Data',
      text: convertedObj
    }
    if(navigator.canShare(entireObj)){
          await window.navigator.share(entireObj)
    }
    else{
      console.log('not possible')
    }
  }

  export default ShareLink