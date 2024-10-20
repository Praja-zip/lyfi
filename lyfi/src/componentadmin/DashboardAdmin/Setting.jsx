import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import userPhoto from "./../../assets/user.png";

const SettingProfile = () => {
    const [loading, setLoading] = useState(true);
    const [profileImage, setProfileImage] = useState(userPhoto); // State to manage the profile image

    useEffect(() => {
        // Function to handle when the page is fully loaded
        const handlePageLoad = () => setLoading(false);

        // Add event listener to trigger when the page is fully loaded
        window.addEventListener("load", handlePageLoad);

        // Check if the page is already fully loaded
        if (document.readyState === "complete") {
            setLoading(false);
        }

        // Clean up the event listener when the component unmounts
        return () => window.removeEventListener("load", handlePageLoad);
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result); // Update profile image state with the selected file
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setProfileImage(userPhoto); // Reset to default image
    };

    return (
        <>
            {loading ? (
                <Loading /> // Display loading when the data is still being fetched
            ) : (
                <div className="setting-container">
                    <div className="setting-form">
                        <h1><i className="fa-solid fa-wrench me-5"></i>Setting</h1>
                        <hr />
                        <div className="form-setting ms-5">
                            <img src={profileImage} alt="User" />
                            <label htmlFor="file-upload" className="custom-file-uploadd">
                                Ganti Foto
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <button className="custom-file-upload" onClick={handleRemoveImage}>
                                Hapus
                            </button>
                        </div>
                        <div className="setting-form">
                            <div className="form-addproduct">
                                <div className="addproduct-input row">
                                    <label htmlFor="redirect">Nama Anda :</label>
                                    <input type="text" name="redirect" placeholder="Nama" />
                                    <label className="mt-5" htmlFor="redirect">Link Instagram :</label>
                                    <input type="text" name="redirect" placeholder="Link" />
                                    <label className="mt-5" htmlFor="redirect">Link WhatsApp :</label>
                                    <input type="text" name="redirect" placeholder="Link" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SettingProfile;
