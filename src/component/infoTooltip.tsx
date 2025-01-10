// @ts-nocheck
import React, { useState } from "react";

export const InfoTooltip = ({ content }) => {
    const [visible, setVisible] = useState(false);

    const styles = {
        container: {
            position: "relative",
            display: "inline-block",
            cursor: "pointer",
        },
        icon: {
            fontSize: "20px",
            color: "red",
            border: "1px solid red",
            borderRadius: "50%",
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none", 
        },
        tooltip: {
            position: "absolute",
            top: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "5px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            whiteSpace: "nowrap",
            zIndex: 10,
            display: visible ? "block" : "none",
        },
        tooltipArrow: {
            position: "absolute",
            top: "-6px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "10px",
            height: "10px",
            backgroundColor: "#fff",
            borderLeft: "1px solid #ddd",
            borderTop: "1px solid #ddd",
            transformOrigin: "center",
            transform: "translateX(-50%) rotate(45deg)",
        },
    };

    return (
        <div
            style={styles.container}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onClick={() => setVisible(!visible)}
        >
            <div style={styles.icon}>i</div>
            <div style={styles.tooltip}>
                <div style={styles.tooltipArrow}></div>
                {content}
            </div>
        </div>
    );
}
