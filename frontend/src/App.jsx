import { useState } from "react";
import StartAudit from "./pages/StartAudit";
import AuditOverview from "./pages/AuditOverview";
import PageBreakdown from "./pages/PageBreakdown";
import "./index.css";

const SCREEN = {
    START: "start",
    OVERVIEW: "overview",
    BREAKDOWN: "breakdown",
};

export default function App() {
    const [screen, setScreen] = useState(SCREEN.START);
    const [auditData, setAuditData] = useState(null);

    const handleAuditComplete = (data) => {
        setAuditData(data);
        setScreen(SCREEN.OVERVIEW);
    };

    const handleNewAudit = () => {
        setAuditData(null);
        setScreen(SCREEN.START);
    };

    return (
        <>
            {screen === SCREEN.START && (
                <StartAudit onAuditComplete={handleAuditComplete} />
            )}
            {screen === SCREEN.OVERVIEW && auditData && (
                <AuditOverview
                    audit={auditData}
                    onViewPages={() => setScreen(SCREEN.BREAKDOWN)}
                    onNewAudit={handleNewAudit}
                />
            )}
            {screen === SCREEN.BREAKDOWN && auditData && (
                <PageBreakdown
                    audit={auditData}
                    onBack={() => setScreen(SCREEN.OVERVIEW)}
                />
            )}
        </>
    );
}