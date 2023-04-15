const Header = () => {

    const headerWrapper = {
        "width": "100%",
        "minHeight": "45px",
        "float": "left",
        "background-color": "#333"
    };

    const headerContent = {
        "width": "100%",
        "minHeight": "45px",
        "float": "left",
        "textAlign": "center",
        "fontFamily": "arial",
        "fontSize": "26pt",
        "letterSpacing": "10px",
        "paddingTop": "10px",
        "paddingBottom": "10px",
        "color": "#fff"
    };

    return (
        <div style={headerWrapper}>
            <div style={headerContent}>
                <img src="logo.png" alt="Logo which contains text 'Cashflow'"/>
            </div>
        </div>
    )
};

export default Header;