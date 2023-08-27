"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("fe14ada0-cd97-4e92-8258-d9218d0e2592");
  }, []);

  return null;
};
