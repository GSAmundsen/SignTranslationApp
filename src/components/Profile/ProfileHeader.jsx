function ProfileHeader({username}){ //either props.username, or destructure into username directly.
    const uname = String(username).charAt(0).toUpperCase() + username.slice(1)
   
    return(
        <p>Welcome {uname}!</p>
    )
}

export default ProfileHeader