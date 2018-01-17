export interface GwConfirmConfig {
    title?: string;
    content?: string;
    confirmClass?: string;
    confirmText?: string;
    zIndex?: number;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}