/**
 * <media-slot> — video/image slot for real project files.
 *
 * <media-slot src="videos/reel" label="Reel del estudio"></media-slot>
 *   → tries videos/reel.mp4, videos/reel.mov, videos/reel.webm (in that order)
 *     and videos/reel.jpg / .png as a still.
 *   → autoplays muted + loop + playsinline while in viewport; pauses when out.
 *   → prefers-reduced-motion: never autoplays, plays only on hover/tap.
 *   → if no file exists yet, shows a labelled placeholder with the expected path.
 *   → drag a local video/image onto it for a session-only preview.
 *
 * Attributes: src (path without extension) · label · poster (explicit image url) · fit (cover|contain)
 */
(function () {
  if (customElements.get("media-slot")) return;

  const VIDEO_EXT = ["mp4", "mov"];

  if (!document.getElementById("media-slot-base")) {
    const st = document.createElement("style");
    st.id = "media-slot-base";
    st.textContent = "media-slot{position:absolute;inset:0;display:block;overflow:hidden;background:rgba(245,237,214,.06)}";
    document.head.appendChild(st);
  }

  class MediaSlot extends HTMLElement {
    connectedCallback() {
      if (this._built) return;
      this._built = true;
      const src = this.getAttribute("src") || "";
      const label = this.getAttribute("label") || "";
      const fit = this.getAttribute("fit") || "cover";
      const poster = this.getAttribute("poster") || "";

      const dark = this.getAttribute("tone") === "dark";
      const fg = dark ? "rgba(28,30,27,.62)" : "rgba(245,237,214,.72)";
      const stripe = dark ? "rgba(28,30,27,.06)" : "rgba(245,237,214,.05)";
      const ph = document.createElement("div");
      ph.style.cssText =
        "position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;padding:24px;" +
        "font-family:var(--font-body,system-ui);color:" + fg + ";background:repeating-linear-gradient(135deg," + stripe + " 0 2px,transparent 2px 10px)";
      ph.innerHTML =
        '<span style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;opacity:.75">' + label + "</span>" +
        '<span style="font-size:13px;letter-spacing:.02em;opacity:.6">' + src + ".mp4 · .mov</span>" +
        '<span style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;opacity:.4">Arrastrá un archivo</span>';
      this.appendChild(ph);
      this._ph = ph;

      const video = document.createElement("video");
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.preload = "metadata";
      if (poster) video.poster = poster;
      video.style.cssText =
        "position:absolute;inset:0;width:100%;height:100%;object-fit:" + fit + ";display:block;opacity:0;transition:opacity 420ms cubic-bezier(.22,.61,.36,1)";
      if (src) VIDEO_EXT.forEach(ext => {
        const s = document.createElement("source");
        s.src = src + "." + ext;
        s.type = ext === "mov" ? "video/quicktime" : "video/" + ext;
        video.appendChild(s);
      });
      this.appendChild(video);
      this._video = video;

      video.addEventListener("loadeddata", () => this._ready(video));
      if (poster) this._tryImage(poster, fit);

      this._observe();
      this._dropzone();
    }

    _ready(el) {
      this._ok = true;
      el.style.opacity = "1";
      if (this._ph) this._ph.style.opacity = "0";
      this._maybePlay();
    }

    _tryImage(url, fit) {
      if (this._img) return;
      const img = document.createElement("img");
      img.alt = "";
      img.style.cssText =
        "position:absolute;inset:0;width:100%;height:100%;object-fit:" + fit + ";display:block;opacity:0;transition:opacity 420ms cubic-bezier(.22,.61,.36,1)";
      img.addEventListener("load", () => { this._ok = true; img.style.opacity = "1"; if (this._ph) this._ph.style.opacity = "0"; });
      this.appendChild(img);
      this._img = img;
      if (url) img.src = url;
    }

    _observe() {
      if (!("IntersectionObserver" in window)) return;
      this._io = new IntersectionObserver(entries => {
        entries.forEach(e => { this._visible = e.isIntersecting && e.intersectionRatio > 0.35; this._maybePlay(); });
      }, { threshold: [0, 0.35, 0.7] });
      this._io.observe(this);
      this.addEventListener("mouseenter", () => { this._hover = true; this._maybePlay(); });
      this.addEventListener("mouseleave", () => { this._hover = false; this._maybePlay(); });
    }

    _maybePlay() {
      const v = this._video;
      if (!v || !this._ok) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const should = reduced ? this._hover : (this._visible || this._hover);
      if (should) { v.play().catch(() => {}); } else { v.pause(); }
    }

    _dropzone() {
      const stop = e => { e.preventDefault(); e.stopPropagation(); };
      this.addEventListener("dragover", e => { stop(e); this.style.outline = "2px solid var(--sortu-ocre,#E8A838)"; });
      this.addEventListener("dragleave", e => { stop(e); this.style.outline = "none"; });
      this.addEventListener("drop", e => {
        stop(e);
        this.style.outline = "none";
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (!f) return;
        const url = URL.createObjectURL(f);
        if (f.type.startsWith("video")) {
          this._video.innerHTML = "";
          this._video.src = url;
          this._video.load();
        } else if (f.type.startsWith("image")) {
          if (!this._img) this._tryImage("", this.getAttribute("fit") || "cover");
          this._img.src = url;
          this._img.style.opacity = "1";
          if (this._video) this._video.style.opacity = "0";
          this._ok = true;
          if (this._ph) this._ph.style.opacity = "0";
        }
      });
    }

    disconnectedCallback() { if (this._io) this._io.disconnect(); }
  }

  customElements.define("media-slot", MediaSlot);
})();
