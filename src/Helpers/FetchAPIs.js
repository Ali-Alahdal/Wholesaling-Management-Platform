
import Cookies from "js-cookie";




async function FetchAPIs(endPoint,method,content,type,objects)
{
    
      const headers = new Headers();
      headers.set("Authorization", `Bearer ${Cookies.get("token")}`);
      type === "form-data" ? console.log() :  headers.set('Content-Type', 'application/json'); 
      

      const formData = new FormData();
      if(type === "form-data" ){
           
            if(objects){
                  Object.entries(content).forEach(([key , value]) =>{

                        Object.entries(value).forEach((key1 , value1) =>{

                              if(key1[0] == "addresses"){
                                    Object.entries(key1[1]).forEach((key2 , value2) =>{
                                          formData.append(`user[addresses][${key2[0]}]` , key2[1]);
                                          console.log(`user[addresses][${key2[0]}]` , key2[1]);
                                    })
                              } else if(key1[0] == "logo"){
                                    formData.append("user[logo]" , key1[1] ,`[${key1[1].name}]` )
                                    console.log("user[logo]" , key1[1] ,key1[1].name);
                              } else {
                                    formData.append(`user[${key1[0]}]` , key1[1])
                                    console.log(`user[${key1[0]}]` , key1[1]);
                              }
                        }) 
                  })    
            }else{
                  Object.entries(content).forEach(([key , value]) =>{
                        if(typeof value === "object" && (key !== "logo" && key !== "image")){
                              Object.entries(value).forEach(([key1 , value1]) =>{
                                    formData.append(`[${key}][${key1}]` , value1);
                                    console.log(`[${key}][${key1}]` , value1);
                              })
                              
                        }else{
                              formData.append(key , value);
                              console.log(key , value);
                        }
                  });
            }
      }

      try{  
         
            const response =  await fetch(`https://growsoft-001-site1.htempurl.com/api/${endPoint}`,{
                  headers : headers,
                  method : method,
                  body :  type === "form-data" ? formData : JSON.stringify(content),
                  redirect : "follow"
            });

            return response;

      }catch(err){

         console.log(err);
         
      }

}

export default FetchAPIs  ;