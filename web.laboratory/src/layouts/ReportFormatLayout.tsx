import React, {useState} from "react";
import {Drawer} from "antd";
import {useLocation, useNavigate} from "react-router-dom";

type ReportFormatLayoutProps = {
    title: string;
    children?: React.ReactNode;
}

export default function ReportFormatLayout(props: ReportFormatLayoutProps) {
    const [open, setOpen] = useState(true)
    // const history = useH()
    const navigate = useNavigate();
    
    const onClose = () => {
        setOpen(false)
        // wait for 1 second.
        setTimeout(() => navigate(-1), 250)
    }
    
    return (
        <Drawer
            title={props.title}
            open={open}
            onClose={onClose}
        >
            {props.children}
        </Drawer>
    )
}