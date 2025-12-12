import { useState } from "react";
import { api } from "../../services/api";
import { Upload, Video, FileVideo, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function VideoUploadForm({ onClose, isPage = false }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const analyze = async () => {
        if (!file) return;
        setLoading(true);
        const formData = new FormData();
        formData.append("video", file);

        try {
            const result = await api.ai.analyzeVideo(formData);
            setAnalysisResult(result);
            toast.success("Vídeo analisado com sucesso!");
        } catch (error) {
            console.error(error);
            toast.error("Erro ao analisar vídeo.");
        } finally {
            setLoading(false);
        }
    };

    const containerClass = isPage
        ? "w-full h-full flex flex-col"
        : "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm";

    const contentClass = isPage
        ? "w-full flex flex-col h-full"
        : "bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200";

    const headerClass = isPage
        ? "hidden"
        : "p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center";


    return (
        <div className={containerClass}>
            <div className={contentClass}>
                <div className={headerClass}>
                    <div className="flex items-center gap-2">
                        <Video className="text-indigo-600 dark:text-indigo-400" size={24} />
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                            Análise de Vídeo com IA
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    {!analysisResult ? (
                        <div className="flex flex-col items-center justify-center space-y-4 py-8">
                            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-indigo-300 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload
                                        className={`w-12 h-12 mb-4 ${file ? "text-indigo-600" : "text-slate-400"
                                            }`}
                                    />
                                    <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                                        <span className="font-semibold">Clique para enviar</span> ou
                                        arraste o vídeo
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        MP4, WebM (Max 20MB)
                                    </p>
                                    {file && (
                                        <div className="mt-4 flex items-center gap-2 text-indigo-600 font-medium">
                                            <FileVideo size={16} />
                                            {file.name}
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="video/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>

                            <button
                                onClick={analyze}
                                disabled={!file || loading}
                                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Analisando com Gemini...
                                    </span>
                                ) : (
                                    "Iniciar Análise"
                                )}
                            </button>
                            <div className="text-xs text-slate-500 text-center flex items-center gap-1">
                                <AlertCircle size={12} />
                                A análise pode levar alguns segundos dependendo do tamanho do vídeo.
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100 mb-2">
                                Pontos Importantes Identificados
                            </h3>
                            <div className="space-y-3">
                                {Array.isArray(analysisResult) ? (
                                    analysisResult.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-indigo-300 transition-colors"
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-slate-800 dark:text-slate-200">
                                                    {item.title || "Sem título"}
                                                </h4>
                                                <span className="text-xs px-2 py-0.5 rounded bg-slate-200 text-slate-600">
                                                    {item.priority || "Normal"}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                                {item.description}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <pre className="bg-slate-100 p-4 rounded text-xs overflow-auto max-h-96">
                                        {JSON.stringify(analysisResult, null, 2)}
                                    </pre>
                                )}
                            </div>
                            <button
                                onClick={() => {
                                    setAnalysisResult(null);
                                    setFile(null);
                                }}
                                className="mt-4 text-indigo-600 text-sm hover:underline"
                            >
                                Analisar outro vídeo
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
