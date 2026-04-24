import { Snackbar, Alert, type AlertColor } from '@mui/material';

interface ToastProps {
    open: boolean;
    message: string;
    severity?: AlertColor; // 'error' | 'warning' | 'info' | 'success'
    onClose: () => void;
}

export const Toast = ({ open, message, severity = 'error', onClose }: ToastProps) => {
    return (
        <Snackbar onClose={onClose} open={open} autoHideDuration={6000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>

            <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};