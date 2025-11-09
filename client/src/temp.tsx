import { useState, useEffect, useRef } from "react";

interface TimelineItem {
  id: string;
  title: string;
  period: string;
  description: string;
  details: string[];
  color: string;
  icon: string;
  side: 'left' | 'right';
}