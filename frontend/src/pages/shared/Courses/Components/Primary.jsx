const Primary = ({ children, className = "", ...props }) => (
    <button
        className={
        "rounded-full bg-[#2563eb] text-white px-5 py-3 hover:bg-[#1d4ed8] transition " + className
        }
        {...props}
    >
        {children}
    </button>
);

export default Primary;