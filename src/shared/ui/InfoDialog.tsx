import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon';

interface InfoDialogProps {
    title: string;
    text: string;
    open: boolean;
    onClose: () => void;
}

const InfoDialog = ({ title, text, open, onClose }: InfoDialogProps) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (open && ref.current) {
            ref.current.focus();
        }
    }, [open]);

    if (!open) {
        return null;
    }

    return createPortal(
        <div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby="info-dialog-title"
            className="fixed inset-0 z-60 flex items-center justify-center"
            tabIndex={-1}
            onKeyDown={(e) => {
                if (e.key === 'Escape') onClose();
            }}
        >
            <div
                className="absolute inset-0 bg-black/50"
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
            />
            <div className="relative bg-white text-slate-900 rounded-lg shadow-lg w-[min(90%,28rem)] p-6 z-10 border border-slate-800 ring-1 ring-slate-800">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 id="info-dialog-title" className="text-lg font-semibold">{title}</h3>
                        <div className="mt-2 text-sm text-slate-700">{text}</div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="ml-4 text-slate-400 hover:text-slate-600"
                    >
                        <Icon name="close" className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default InfoDialog;
