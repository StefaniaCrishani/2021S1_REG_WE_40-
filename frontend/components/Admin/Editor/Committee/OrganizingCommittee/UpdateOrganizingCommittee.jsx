import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { reactLocalStorage } from 'reactjs-localstorage';

export default function UpdateOrganizingCommittee() {
    var OrganizingCommittee = reactLocalStorage.getObject('OrganizingCommittee');
    const id = OrganizingCommittee[0];
    const [name, setName] = useState(OrganizingCommittee[1]);
    const [images, setImage] = useState('https://res.cloudinary.com/applicationframework2021/image/upload/v1624901540/' + OrganizingCommittee[2]);
    const [department, setDepartment] = useState(OrganizingCommittee[3]);
    const [description, setDescription] = useState(OrganizingCommittee[4]);
    const [status, setStatus] = useState(OrganizingCommittee[5]);

    function updateProfile(e) {
        e.preventDefault();
        const newUpdateCommittee = {
            name,
            images,
            department,
            description,
            status
        }

        axios.post("http://localhost:6060/orgCommittee/updateOrganizingCommittee/" + id, newUpdateCommittee).then(() => {

            Swal.fire({
                title: "Success!",
                text: "Update Successed!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            }).then(okay => {
                if (okay) {
                    window.location.href = "/ViewOrg";
                }
            });

        }).catch((err) => {
            Swal.fire({
                title: "error!",
                text: "Update Not Success",
                icon: 'error',
                position: 'center',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
        })
    }

    return (
        <div>
            <div className="d-flex p-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                <h1 tag='div' className='display-1 pb-3 mb-3 border-bottom'>Add Organizing Committee</h1>
            </div>
            <div className="col-md-14 col-sm-12" style={{ maxWidth: '70rem', margin: 'auto', padding: '10px' }}>
                <div className="row g-0">
                    <div className="form-outline mb-4">
                        Name: <input type="text" id="name" className="form-control border border-dark mb-3" name="name" value={name} onChange={(e) => { setName(e.target.value) }} required />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label" for="customFile">Add Image</label>
                        <img type="file" value={images} onChange={(e) => { setImage(e.target.files[0]) }} className="form-control" id="customFile" required />

                    </div>
                    <div className="form-outline mb-4">
                        Department: <input type="text" id="department" className="form-control border border-dark mb-3" name="department" value={department} onChange={(e) => { setDepartment(e.target.value) }} required />

                    </div>
                    <div className="form-outline mb-4">
                        Description: <textarea className="form-control border border-dark mb-3" id="description" rows="4" name="description" value={description} onChange={(e) => { setDescription(e.target.value) }} required />

                    </div>
                    <div className="form-outline mb-4">
                        Status:
                        <select className="form-select" aria-label="Default select example" id="status" name="status" onChange={(e) => { setStatus(e.target.value) }}>
                            <option value={status} selected>Selected - {status}</option>
                            <option selected value="Pending">Pending</option>
                            <option value="Post">Post</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <button type="submit" onClick={updateProfile} className="btn btn-primary btn-block mb-4"><i className="bi bi-pencil-square"></i></button>
                    <a href="/vieworg">
                        <button type="button" className="btn btn-outline-dark btn-sm">Cancel<i class="bi bi-backspace"></i></button>
                    </a>
                </div>
            </div>
        </div>
    );
}
