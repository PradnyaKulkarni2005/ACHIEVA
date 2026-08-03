import AchievementUploadForm from './components/AchievementUploadForm';

export default function UploadPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900">Upload Achievement</h1>
        <p className="text-slate-600">Share your achievements and certificates for faculty review.</p>
      </div>

      <AchievementUploadForm />
    </div>
  );
}
