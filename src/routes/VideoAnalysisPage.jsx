import VideoUploadForm from "../features/tasks/VideoUploadForm";

export default function VideoAnalysisPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Análise de Vídeo com IA</h1>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <VideoUploadForm isPage={true} />
            </div>
        </div>
    );
}
