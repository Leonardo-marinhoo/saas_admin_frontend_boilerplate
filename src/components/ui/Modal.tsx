import React, { useEffect } from "react";
import type { ReactNode } from "react";
import styled from "styled-components";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  width?: string;
  fullscreen?: boolean;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 16px;
  overflow-y: auto;

  @media (max-width: 600px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }

  @media (max-width: 360px) {
    padding: 4px;
  }
`;

const ModalBox = styled.div<{ width?: string; fullscreen?: boolean }>`
  background: #fff;
  border-radius: ${({ fullscreen }) => (fullscreen ? "0" : "16px")};
  box-shadow: ${({ fullscreen }) =>
    fullscreen
      ? "none"
      : "0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)"};
  padding: ${({ fullscreen }) => (fullscreen ? "0" : "32px 24px 24px 24px")};
  min-width: ${({ fullscreen }) => (fullscreen ? "100vw" : "320px")};
  max-width: ${({ fullscreen }) => (fullscreen ? "100vw" : "600px")};
  width: 100%;
  max-height: 90vh;
  height: ${({ fullscreen }) => (fullscreen ? "100vh" : "auto")};
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media (max-width: 700px) {
    max-width: ${({ fullscreen }) => (fullscreen ? "100vw" : "98vw")};
    max-height: 85vh;
    padding: ${({ fullscreen }) => (fullscreen ? "0" : "24px 16px")};
  }

  @media (max-width: 600px) {
    max-width: ${({ fullscreen }) => (fullscreen ? "100vw" : "95vw")};
    max-height: 80vh;
    padding: ${({ fullscreen }) => (fullscreen ? "0" : "20px 12px")};
  }

  @media (max-width: 480px) {
    max-width: ${({ fullscreen }) => (fullscreen ? "100vw" : "98vw")};
    max-height: 75vh;
    padding: ${({ fullscreen }) => (fullscreen ? "0" : "16px 8px")};
  }

  @media (max-width: 360px) {
    max-width: ${({ fullscreen }) => (fullscreen ? "100vw" : "100vw")};
    max-height: 70vh;
    padding: ${({ fullscreen }) => (fullscreen ? "0" : "12px 6px")};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #999;
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 4px;
  min-width: 32px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #ea1d2c;
  }

  @media (max-width: 600px) {
    top: 20px;
    right: 20px;
    font-size: 1.8rem;
    min-width: 28px;
    min-height: 28px;
  }

  @media (max-width: 480px) {
    top: 16px;
    right: 16px;
    font-size: 1.6rem;
    min-width: 24px;
    min-height: 24px;
  }

  @media (max-width: 360px) {
    top: 12px;
    right: 12px;
    font-size: 1.4rem;
    min-width: 20px;
    min-height: 20px;
  }
`;

const Title = styled.h2`
  margin: 0 0 24px 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ea1d2c;
  text-align: center;
  word-wrap: break-word;
  line-height: 1.2;

  @media (max-width: 600px) {
    font-size: 1.3rem;
    margin: 0 0 20px 0;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin: 0 0 16px 0;
  }

  @media (max-width: 360px) {
    font-size: 1.1rem;
    margin: 0 0 12px 0;
  }
`;

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  width,
  fullscreen = false,
}) => {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalBox
        width={width}
        fullscreen={fullscreen}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton aria-label="Fechar" onClick={onClose}>
          &times;
        </CloseButton>
        {title && <Title>{title}</Title>}
        {children}
      </ModalBox>
    </Overlay>
  );
};

export default Modal;
