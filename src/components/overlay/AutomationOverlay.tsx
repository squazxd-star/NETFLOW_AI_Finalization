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
        <>
            <style>{`
                @keyframes nf-spin { to { transform: rotate(360deg); } }
            `}</style>
            <div style={{
                position: 'fixed',
                top: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 999999,
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(20, 20, 20, 0.92)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                padding: '8px 16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                border: '1px solid rgba(0, 210, 255, 0.3)',
                fontFamily: "'Inter', sans-serif",
                color: '#fff',
                fontSize: '13px',
                maxWidth: '520px',
            }}>
                {/* Spinner */}
                <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '2.5px solid #333',
                    borderTopColor: '#00D2FF',
                    animation: 'nf-spin 0.8s linear infinite',
                    flexShrink: 0,
                }} />

                {/* Step info */}
                <span style={{ color: '#00D2FF', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    {stepNumber}/{totalSteps}
                </span>

                {/* Current step label */}
                <span style={{
                    color: '#ccc',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '260px',
                }}>
                    {currentStep}
                </span>

                {/* Progress bar */}
                <div style={{
                    width: '60px',
                    height: '4px',
                    backgroundColor: '#333',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    flexShrink: 0,
                }}>
                    <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        backgroundColor: '#00D2FF',
                        transition: 'width 0.4s ease-out',
                    }} />
                </div>

                {/* Stop button */}
                <button
                    onClick={onStop}
                    style={{
                        padding: '4px 10px',
                        backgroundColor: 'transparent',
                        color: '#FF3B30',
                        border: '1px solid #FF3B30',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        outline: 'none',
                        transition: 'background 0.15s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 59, 48, 0.25)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    STOP
                </button>
            </div>
        </>
    );
};

export default AutomationOverlay;
