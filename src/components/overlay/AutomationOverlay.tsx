import React from 'react';

interface AutomationOverlayProps {
    isVisible: boolean;
    currentStep: string;
    stepNumber: number;
    totalSteps: number;
    onStop: () => void;
}

const AutomationOverlay: React.FC<AutomationOverlayProps> = ({
    isVisible,
    currentStep,
    stepNumber,
    totalSteps,
    onStop
}) => {
    if (!isVisible) return null;

    const progress = (stepNumber / totalSteps) * 100;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            zIndex: 999999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(5px)',
            color: 'white',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{
                marginBottom: '20px',
                fontSize: '24px',
                fontWeight: '600',
                letterSpacing: '0.5px'
            }}>
                🤖 NetFlow Automation
            </div>

            {/* Spinner */}
            <div style={{
                position: 'relative',
                width: '80px',
                height: '80px',
                marginBottom: '30px'
            }}>
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '4px solid #333',
                    borderTopColor: '#00D2FF',
                    animation: 'spin 1s linear infinite'
                }} />
                {/* Inner Pulse */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(0, 210, 255, 0.2)',
                    animation: 'pulse 1.5s ease-in-out infinite'
                }} />
            </div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes pulse { 0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; } 50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; } 100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; } }
            `}</style>

            <div style={{
                fontSize: '18px',
                marginBottom: '10px',
                color: '#E0E0E0'
            }}>
                Step {stepNumber}/{totalSteps}
            </div>

            <div style={{
                fontSize: '20px',
                fontWeight: '500',
                color: '#fff',
                marginBottom: '30px',
                textAlign: 'center',
                maxWidth: '80%'
            }}>
                {currentStep}
            </div>

            {/* Progress Bar Container */}
            <div style={{
                width: '300px',
                height: '6px',
                backgroundColor: '#333',
                borderRadius: '3px',
                marginBottom: '40px',
                overflow: 'hidden'
            }}>
                {/* Progress Fill */}
                <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    backgroundColor: '#00D2FF',
                    boxShadow: '0 0 10px rgba(0, 210, 255, 0.5)',
                    transition: 'width 0.5s ease-out'
                }} />
            </div>

            <button
                onClick={onStop}
                style={{
                    padding: '10px 24px',
                    backgroundColor: 'rgba(255, 59, 48, 0.2)',
                    color: '#FF3B30',
                    border: '1px solid #FF3B30',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.2s',
                    outline: 'none'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 59, 48, 0.4)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 59, 48, 0.2)'}
            >
                STOP AUTOMATION
            </button>

            <div style={{
                position: 'fixed',
                bottom: '30px',
                fontSize: '12px',
                color: '#666'
            }}>
                Do not close this tab or switch windows
            </div>
        </div>
    );
};

export default AutomationOverlay;
