import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function AdminMockupUploadComponent(){
    const {proyectId} = useParams();
    const [files, setFiles] = useState([]);
    async function uploadFiles(){
        const formData = new FormData();
        for (let index = 0; index < files.length; index++) {
            formData.append(`images[${index}]`, files[index]);
        }
        formData.append("proyectId", proyectId)
        await fetch(
            "http://localhost:8080/uploadMockups",
            {
                method:"POST",
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("platform-token")}`
                },
                body: formData
            }
        )
        .then(res => setFiles([]))
        .catch(error => {console.error(error)});
    }
    function handleSubmit(event){
        event.preventDefault();
        uploadFiles();
    }
    function handleChange({target:{files}}){
        setFiles(files);
    }
    useEffect(() => {
    }, [proyectId, files]);
    return(
        <form id="admin-upload"  encType="multipart/form-data" onSubmit={handleSubmit}>
            <h3>Upload new Mockups!</h3>
            <input type="file" name="images" accept="image/*" multiple onChange={handleChange}/>
            <button type="submit">Submit</button>
        </form>
    );
}
export default AdminMockupUploadComponent;