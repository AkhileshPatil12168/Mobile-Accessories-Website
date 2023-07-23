import { useEffect } from "react";
import { useState } from "react";

const TestCss = () => {
    const [isHovered, setIsHovered] = useState(false);
    useEffect(() => {
        console.log(isHovered);
    }, []);

    return (
        <div>
            <div className="h-20 w-1/2 bg-green-500">
                <div
                    onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}
                    onMouseOut={() => setIsHovered(false)}
                    className={`h-full  ${isHovered?"bg-white scale-x-0 ":"w-full scale-x-100"}   origin-right  duration-500`}
                ></div>
            </div>
        </div>
    );
};
export default TestCss;
