import React, { useContext ,useState,useEffect} from 'react'
import './Profile.css'
import axios from 'axios';
import { storeContext } from '../../context/storeContext';
const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [editName, setEditName] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [newName, setNewName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const accessToken = localStorage.getItem('token');
    const { url } = useContext(storeContext);
    useEffect(() => {
      const fetchProfileData = async () => {
        try {
          const response = await axios.get(url+"api/user/profile",{
            headers: {Authorization: `Bearer ${accessToken}`,},
        });
          console.log(response);
          setProfileData(response.data.data);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      };
  
      fetchProfileData();
    }, [accessToken]);
    const handleNameChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${url}api/user/update`,
                { name: newName },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setMessage(response.data.message);
            setProfileData((prevData) => ({ ...prevData, name: newName }));
        } catch (error) {
            console.error('Error updating name:', error);
            setMessage('Error updating name');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("New passwords do not match");
            return;
        }

        try {
            const response = await axios.put(
                `${url}api/user/change-password`,
                { currentPassword, newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setMessage(response.data.message);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message); // Error message from the server
            } else {
                setMessage('Error updating password'); // Generic error message
            }
        }
    };

  
    if (!profileData) {
      return <div>Loading...</div>;
    }
  
    return (
        <div className='profile-container'>
            <h1>User Profile </h1>
            

            {/* Name Section */}
            <div className="profile-field">
                
                <p><strong>Name:</strong> {profileData.name}</p>
                <button className="edit-btn" onClick={() => setEditName(!editName)}>
                    {editName ? 'Cancel' : 'Edit'}
                </button>
                {editName && (
                    <form onSubmit={handleNameChange}>
                        <input 
                            type="text" 
                            value={newName} 
                            onChange={(e) => setNewName(e.target.value)} 
                            placeholder="New Name" 
                        />
                        <button type="submit">Update Name</button>
                    </form>
                )}
            </div>

            {/* Password Section */}
            <div className="profile-field">
                <p><strong>Password:</strong> ••••••••</p>
                <button className="edit-btn" onClick={() => setEditPassword(!editPassword)}>
                    {editPassword ? 'Cancel' : 'Edit'}
                </button>
                {editPassword && (
                    <form onSubmit={handlePasswordChange}>
                        <input 
                            type="password" 
                            value={currentPassword} 
                            onChange={(e) => setCurrentPassword(e.target.value)} 
                            placeholder="Current Password" 
                        />
                        <input 
                            type="password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            placeholder="New Password" 
                        />
                        <input 
                            type="password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            placeholder="Confirm New Password" 
                        />
                        <button type="submit">Change Password</button>
                    </form>
                )}
            </div>
            <p><strong>Email:</strong>{profileData.email}</p>

            {message && <p className="message">{message}</p>}
        </div>
    );
  };


export default Profile