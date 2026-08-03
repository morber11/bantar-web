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
    const ref = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        const dialog = ref.current;
        if (!dialog) return;

        if (open && !dialog.open) {
            dialog.showModal();
        } else if (!open && dialog.open) {
            dialog.close();
        }
    }, [open]);

    return createPortal(
        <dialog
            ref={ref}
            aria-labelledby="info-dialog-title"
            onClose={onClose}
            className="m-auto bg-transparent p-0 border-0 rounded-lg"
        >
            <div className="bg-white text-slate-900 rounded-lg shadow-lg w-[min(90%,28rem)] p-6 border border-slate-800 ring-1 ring-slate-800">
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
        </dialog>,
        document.body
    );
};

export default InfoDialog;
