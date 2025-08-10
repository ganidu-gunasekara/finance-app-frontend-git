// components/PdfCanvasViewer.tsx
"use client";

import { useEffect, useRef } from "react";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import type {
  PDFDocumentLoadingTask,
  PDFDocumentProxy,
  PDFPageProxy,
  RenderTask,
} from "pdfjs-dist/types/src/display/api";

// Worker path (v3+ uses .mjs)
GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PdfCanvasViewer({ file }: { file: File }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    // keep refs for cleanup
    let loadingTask: PDFDocumentLoadingTask | null = null;
    let pdfRef: PDFDocumentProxy | null = null;
    let pageRef: PDFPageProxy | null = null;
    let renderTask: RenderTask | null = null;

    (async () => {
      try {
        const data = await file.arrayBuffer();

        loadingTask = getDocument({ data });
        const pdf = await loadingTask.promise;
        if (cancelled) return;
        pdfRef = pdf;

        const page = await pdf.getPage(1);
        if (cancelled) return;
        pageRef = page;

        const dpr = window.devicePixelRatio || 1;
        const scale = 1.5;
        const viewport = page.getViewport({ scale: scale * dpr });

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // HiDPI sizing
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        canvas.style.width = `${viewport.width / dpr}px`;
        canvas.style.height = `${viewport.height / dpr}px`;

        // Start render and await (so we can cancel if remounted)
        renderTask = page.render({ canvasContext: ctx, viewport, canvas });
        await renderTask.promise;
      } catch (e) {
        if (!cancelled) console.error("PDF render error:", e);
      }
    })();

    return () => {
      cancelled = true;
      try { renderTask?.cancel(); } catch {}
      try { pageRef?.cleanup(); } catch {}
      try { pdfRef?.destroy(); } catch {}
      try { loadingTask?.destroy(); } catch {}

      const c = canvasRef.current;
      if (c) {
        c.width = 0;
        c.height = 0;
        c.style.width = "";
        c.style.height = "";
      }
    };
  }, [file]);

  return (
    <div className="w-full h-full overflow-auto">
      <canvas ref={canvasRef} />
    </div>
  );
}
