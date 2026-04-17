import type { StatusMessage } from '@shared/types';
import styles from './StatusDisplay.module.css';

export const StatusDisplay = ({ message }: { message: StatusMessage }) => {
    if (!message.type) return null;

    const statusClass = styles[message.type];

    return (
        <div className={`${styles.container} ${statusClass}`}>
            {message.text}
        </div>
    );
};