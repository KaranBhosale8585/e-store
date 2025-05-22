"use client";
import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white w-full bottom-0 p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="text-sm text-center md:text-left">
          &copy; 2025 Shopping App. All rights reserved.
        </p>

        {/* Social Media Icons */}
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-blue-500 transition-colors"
          >
            <Facebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-sky-400 transition-colors"
          >
            <Twitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-pink-500 transition-colors"
          >
            <Instagram />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="hover:text-red-500 transition-colors"
          >
            <Youtube />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
