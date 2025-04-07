
export function SignIn() {
    return (
        <div className="w-[300px] rounded-md bg-neutral-800 flex flex-col">   
            <div className="flex flex-col rounded-md">
                <div className="w-full h-full flex flex-col items-center justify-center ">
                    <img src="/signin.jpg" className="mask-luminance mask-b-from-white mask-b-from-80% mask-n-to-black rounded-md" draggable={false} />
                </div>
                <div className=" py-5 px-8 mt-5 flex flex-col items-center justify-center">
                    <div className="w-full flex flex-col items-center">
                        <input type="text" placeholder="Username" className="mb-2 p-2 w-full bg-white rounded-md" />
                        <input type="password" placeholder="Password" className="mb-2 p-2 w-full bg-white rounded-md" />
                        <button className="bg-yellow-400 p-2 w-full rounded-md text-neutral-900">awawa</button>
                    </div>
                </div> 
            </div>
        </div>
    );
}