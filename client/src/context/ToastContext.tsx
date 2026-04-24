import { createContext, useState, useCallback, type ReactNode } from 'react';
import { type AlertColor } from '@mui/material';
import { Toast } from '../components/common/Toast';

interface ToastContextType {
    showToast: (message: string, severity?: AlertColor) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor>('info');

    const showToast = useCallback((msg: string, sev: AlertColor = 'info') => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    }, []);

    const handleClose = () => setOpen(false);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toast
                open={open}
                message={message}
                severity={severity}
                onClose={handleClose}
            />
        </ToastContext.Provider>
    );
};

export default ToastContext;