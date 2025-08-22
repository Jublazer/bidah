"use client"

export default function Login(){
    const handleGoogleLogin = () => {
    window.location.href = 'http://10.69.96.154:3000/auth/google'
  }
    return(
        <>
            <div className="container w-full h-[100vh] flex flex-col gap-5 items-center justify-center text-sm">
                <h1>Login User</h1>
                <div className="flex p-0 flex-col shadow-lg backdrop-blur items-center min-h-[500px] justify-center gap-5 bg-white/20 md:w-[40%]  w-[100%] rounded-lg border">
                    <form action="" className="form p-5 w-full flex flex-col gap-5 p-2">
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" id="username" placeholder="Enter Username" className=" w-full p-2 bg-dark-500 border rounded-sm shadow-lg" />
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" placeholder="Enter Password" className=" w-full p-2 bg-dark-500 border rounded-sm shadow-lg" />
                        <br />

                        <button type="submit" className="btn border border-solid bg-transparent trasition-w p-3 rounded-sm cursor-pointer hover:bg-white text-dark">Login</button>
                    </form>
                    <br />
                    <hr />
                    <center>Or</center>
                    <button onClick={handleGoogleLogin}>Login with Google</button>
                </div>

            </div>
        </>
    )
}