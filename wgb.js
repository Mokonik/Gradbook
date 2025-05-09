import { useState, useRef } from "react";

export default function GraduationBook() {
  const [formData, setFormData] = useState({ name: "", message: "", file: null });
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    isDrawing.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = "#00ffff";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleClearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const canvas = canvasRef.current;
    const drawingImage = canvas.toDataURL("image/png");

    const form = document.createElement("form");
    form.action = "https://formspree.io/f/xjvnrzlp"; // Replace with your real Formspree ID
    form.method = "POST";
    form.style.display = "none";

    const addField = (name, value) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    };

    addField("name", formData.name);
    addField("message", formData.message);
    if (formData.file) {
      alert("Image upload will need manual email forwarding from Formspree dashboard.");
    }
    addField("drawing", drawingImage);

    document.body.appendChild(form);
    form.submit();
    form.remove();
  };

  return (
    <div className="bg-gray-900 text-white font-sans min-h-screen scroll-smooth px-4">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-cyan-400 mb-4">Mohannad Aboaysha</h1>
          <p className="text-gray-400 text-lg">Welcome to my digital graduation book</p>
        </div>
      </section>

      {/* Personal Message */}
      <section className="max-w-2xl mx-auto my-12 text-center">
        <h2 className="text-2xl font-bold mb-4">A Message From Me</h2>
        <p className="text-gray-300">
          Thank you for being part of my journey. Feel free to leave a message, a drawing, or even a photo to make this memory special!
        </p>
      </section>

      {/* Submission Form */}
      <section className="max-w-xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-cyan-300">Leave your message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full p-3 rounded bg-gray-700 text-white"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <textarea
            placeholder="Your Message"
            required
            rows="4"
            className="w-full p-3 rounded bg-gray-700 text-white"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          ></textarea>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 text-sm text-gray-300"
            onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
          />

          <div>
            <p className="mb-2 text-gray-400">Optional Drawing:</p>
            <canvas
              ref={canvasRef}
              width={400}
              height={200}
              className="border border-cyan-500 rounded bg-white cursor-crosshair"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            ></canvas>
            <button
              type="button"
              onClick={handleClearCanvas}
              className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white"
            >
              Clear Drawing
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 rounded font-bold text-white"
          >
            Submit
          </button>
        </form>
      </section>

      <footer className="text-center py-8 text-gray-500">
        © {new Date().getFullYear()} Mohannad Aboaysha
      </footer>
    </div>
  );
}
