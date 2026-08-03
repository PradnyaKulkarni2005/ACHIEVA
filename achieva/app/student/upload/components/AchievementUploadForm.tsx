'use client';

import { useEffect, useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { uploadAchievement, type UploadAchievementPayload } from '@/lib/supabase/services/achievement-upload';
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Info,
  Award,
  Calendar,
  FolderOpen,
} from 'lucide-react';

export default function AchievementUploadForm() {
  const [fileName, setFileName] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    organizer: '',
    achievementDate: '',
    proofLink: '',
  });
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isPending) {
      setUploadProgress(0);
    }
  }, [isPending]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
      setUploadProgress(20);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setMessageType(null);

    if (!selectedFile) {
      setMessage('Please select a certificate file.');
      setMessageType('error');
      return;
    }

    setUploadProgress(40);

    startTransition(async () => {
      const payload: UploadAchievementPayload = {
        title: form.title,
        description: form.description,
        category: form.category,
        organizer: form.organizer,
        achievementDate: form.achievementDate,
        proofLink: form.proofLink,
        file: selectedFile,
      };

      const result = await uploadAchievement(payload);
      if (result.success) {
        setMessage(result.message);
        setMessageType('success');
        setUploadProgress(100);
        setForm({ title: '', description: '', category: '', organizer: '', achievementDate: '', proofLink: '' });
        setFileName('');
        setSelectedFile(null);
      } else {
        setMessage(result.message);
        setMessageType('error');
        setUploadProgress(0);
      }
    });
  };

  const categories = ['Academic Paper', 'Research Project', 'Internship', 'Hackathon', 'Competition', 'Sports Achievement', 'Certification', 'Volunteer Work'];

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-100 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
            <Award className="w-5 h-5 text-slate-700" />
          </div>
          <div>
            <CardTitle className="text-xl text-slate-900">Achievement Details</CardTitle>
            <p className="text-sm text-slate-600 mt-1">Fill in all required information</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Achievement Title
              <span className="text-red-500">*</span>
            </label>
            <Input placeholder="e.g. AI Research Paper on Neural Networks" className="border-slate-300 focus:border-slate-500" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              Category
              <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-slate-900" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} required>
              <option value="">Select a category</option>
              {categories.map((cat, index) => <option key={index} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              Organizer
              <span className="text-red-500">*</span>
            </label>
            <Input placeholder="e.g. Google, IEEE, Microsoft" className="border-slate-300 focus:border-slate-500" value={form.organizer} onChange={(event) => setForm({ ...form, organizer: event.target.value })} required />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Achievement Date
              <span className="text-red-500">*</span>
            </label>
            <Input type="date" className="border-slate-300 focus:border-slate-500" value={form.achievementDate} onChange={(event) => setForm({ ...form, achievementDate: event.target.value })} required />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900">
              Description
              <span className="text-red-500">*</span>
            </label>
            <Textarea placeholder="Provide a detailed description of your achievement, including objectives, methodology, outcomes, and impact..." rows={6} className="border-slate-300 focus:border-slate-500 resize-none" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required />
            <p className="text-xs text-slate-500">Minimum 20 characters</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900">Proof Link (Optional)</label>
            <Input type="url" placeholder="https://example.com/proof" className="border-slate-300 focus:border-slate-500" value={form.proofLink} onChange={(event) => setForm({ ...form, proofLink: event.target.value })} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Document (PDF)
              <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 hover:border-slate-400 transition-colors">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-slate-600" />
                </div>
                <div className="text-center">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-slate-900 font-semibold hover:text-slate-700">Click to upload</span>
                    <span className="text-slate-600"> or drag and drop</span>
                  </label>
                  <p className="text-sm text-slate-500 mt-1">PDF, PNG, JPG, or WEBP (max. 10MB)</p>
                </div>
                <Input id="file-upload" type="file" accept=".pdf,.png,.jpg,.jpeg,.webp" className="sr-only" onChange={handleFileChange} />
                {fileName ? (
                  <div className="mt-2 px-4 py-2 bg-slate-100 rounded-lg flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-600" />
                    <span className="text-sm text-slate-900 font-medium">{fileName}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {message ? <div className={`rounded-lg border p-4 text-sm ${messageType === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-red-200 bg-red-50 text-red-700'}`}>{message}</div> : null}

          {uploadProgress > 0 ? (
            <div className="space-y-2">
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-slate-900 transition-all" style={{ width: `${uploadProgress}%` }} />
              </div>
              <p className="text-xs text-slate-500">{uploadProgress < 100 ? 'Uploading your achievement...' : 'Upload complete.'}</p>
            </div>
          ) : null}

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Verification Status</h3>
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-3 py-1">
                <FileText className="w-3 h-3 mr-1" />
                Version v1.0
              </Badge>
              <Badge variant="outline" className="border-amber-300 text-amber-700 bg-amber-50 px-3 py-1">
                <AlertCircle className="w-3 h-3 mr-1" />
                Plagiarism Check: Pending
              </Badge>
              <Badge variant="outline" className="border-slate-300 text-slate-700 px-3 py-1">
                <CheckCircle className="w-3 h-3 mr-1" />
                Faculty Review: Not Started
              </Badge>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50" type="button" disabled={isPending}>Save as Draft</Button>
            <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white" type="submit" disabled={isPending}>
              <Upload className="w-4 h-4 mr-2" />
              {isPending ? 'Uploading...' : 'Submit for Verification'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
