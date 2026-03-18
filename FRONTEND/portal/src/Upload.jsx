import React, { useState } from 'react';
import { Upload, FileText, Image, Loader2, Copy, Download, X } from 'lucide-react';

export default function TextExtractor({ onBack }) {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState('');
  const apiKey = 'AIzaSyBjeFJTM53Lre53yavQfjWEnfp_wtJ_abc';

  // Resource Library Form State
  const [libTitle, setLibTitle] = useState('');
  const [libDoctorName, setLibDoctorName] = useState('');
  const [libHospitalName, setLibHospitalName] = useState('');
  const [libDate, setLibDate] = useState('');
  const [libSubject, setLibSubject] = useState('');
  const [libType, setLibType] = useState('');
  const [libFile, setLibFile] = useState(null);
  const [libLoading, setLibLoading] = useState(false);
  const [libError, setLibError] = useState('');
  const [libSuccess, setLibSuccess] = useState('');

  const handleResourceLibrarySubmit = async (e) => {
    e.preventDefault();
    if (!libTitle || !libDoctorName || !libHospitalName || !libDate || !libFile) {
      setLibError('Please fill in all required fields and select a file.');
      return;
    }

    setLibLoading(true);
    setLibError('');
    setLibSuccess('');

    try {
      const username = localStorage.getItem('userEmail') || 'unknown@guest.com';
      const formData = new FormData();
      formData.append('title', libTitle);
      formData.append('username', username);
      formData.append('doctor_name', libDoctorName);
      formData.append('hospital_name', libHospitalName);
      formData.append('date', libDate);
      if (libSubject) formData.append('subject', libSubject);
      if (libType) formData.append('type', libType);
      formData.append('file', libFile);

      const response = await fetch('http://127.0.0.1:8000/reports/resource_library', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload report');
      }

      setLibSuccess('Report uploaded successfully to Resource Library!');
      
      // Reset form
      setLibTitle('');
      setLibDoctorName('');
      setLibHospitalName('');
      setLibDate('');
      setLibSubject('');
      setLibType('');
      setLibFile(null);
      
      const fileInput = document.getElementById('lib-file');
      if (fileInput) fileInput.value = '';
    } catch (err) {
      setLibError(err.message);
    } finally {
      setLibLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError('');
    setExtractedText('');
    setSummary('');
    setLoading(true);
    setProgress('');

    try {
      if (selectedFile.type === 'application/pdf') {
        await extractTextFromFile(selectedFile, 'application/pdf');
      } else if (selectedFile.type.startsWith('image/')) {
        await extractTextFromFile(selectedFile, selectedFile.type);
      } else {
        setError('Please upload a PDF or image file (PNG, JPG, JPEG, PDF)');
        setLoading(false);
      }
    } catch (err) {
      setError('Error extracting text: ' + err.message);
      setLoading(false);
    }
  };

  const extractTextFromFile = async (file, mimeType) => {
    try {
      setProgress('Converting file to base64...');
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });

      setProgress('Analyzing document...');
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                text: 'Extract all text from this document/image. Preserve the formatting, line breaks, and structure as much as possible. Then, provide a structured summary for medical reports with the following fields: Doctor, Patient, Hospital, Labs, Blood Count Details, Summary. Format the response as: EXTRACTED TEXT: [full extracted text] ---SUMMARY--- Doctor: [details] Patient: [details] Hospital: [details] Labs: [details] Blood Count Details: [details] Summary: [overall summary]'
              },
              {
                inline_data: {
                  mime_type: mimeType,
                  data: base64Data
                }
              }
            ]
          }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 8192
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMsg = `API error: ${response.status}`;
        try {
          const errorData = JSON.parse(errorText);
          errorMsg = errorData.error?.message || errorMsg;
        } catch (e) {
          errorMsg = errorText || errorMsg;
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();
      const fullText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No text could be extracted';
      
      // Parse the response
      const separator = '---SUMMARY---';
      const parts = fullText.split(separator);
      let extracted = fullText;
      let summaryText = '';
      
      if (parts.length > 1) {
        extracted = parts[0].replace(/^EXTRACTED TEXT:\s*/, '').trim();
        summaryText = parts[1].trim();
      }
      
      setExtractedText(extracted);
      setSummary(summaryText);
    } catch (err) {
      throw new Error('Extraction failed: ' + err.message);
    } finally {
      setLoading(false);
      setProgress('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
  };

  const downloadText = () => {
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `extracted_${file?.name || 'text'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearFile = () => {
    setFile(null);
    setExtractedText('');
    setSummary('');
    setError('');
    setProgress('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 overflow-x-hidden">
      <div className="max-w-[90rem] mx-auto">
        {onBack && (
          <button 
            onClick={onBack}
            className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition"
          >
            ← Back
          </button>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Medical Report Upload and Analysis */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              MEDICAL REPORT UPLOAD AND  ANALYSIS
            </h1>
            <p className="text-gray-600">
              
            </p>
          </div>

          <div className="mb-8">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PDF or Image files (PNG, JPG, JPEG)</p>
              </div>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,image/*"
                onChange={handleFileChange}
                disabled={loading}
              />
            </label>

            {file && (
              <div className="mt-4 flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  {file.type === 'application/pdf' ? (
                    <FileText className="w-5 h-5 text-red-500" />
                  ) : (
                    <Image className="w-5 h-5 text-blue-500" />
                  )}
                  <span className="font-medium">{file.name}</span>
                  <span className="text-gray-500">
                    ({(file.size / 1024).toFixed(2)} KB)
                  </span>
                </div>
                {!loading && (
                  <button
                    onClick={clearFile}
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                )}
              </div>
            )}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <p className="font-medium mb-1">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
              <span className="text-gray-600 text-center px-4">{progress || 'Processing...'}</span>
            </div>
          )}

          {extractedText && !loading && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Extracted Text</h2>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                  <button
                    onClick={downloadText}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                  {extractedText}
                </pre>
              </div>
              <div className="text-xs text-gray-500 text-center">
                {extractedText.split(' ').filter(w => w.length > 0).length} words • {extractedText.length} characters
              </div>
            </div>
          )}

          {summary && !loading && (
            <div className="space-y-4 mt-6">
              <h2 className="text-lg font-semibold text-gray-800">Medical Report Summary</h2>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <pre className="whitespace-pre-wrap text-sm text-gray-800">
                  {summary}
                </pre>
              </div>
            </div>
          )}

          {!file && !loading && (
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>How to use:</strong>
              </p>
              <ol className="text-sm text-blue-800 space-y-1 ml-4 list-decimal mt-2">
                <li>Click the upload area above or drag and drop your file</li>
                <li>Select a PDF or image file (PNG, JPG, JPEG)</li>
                <li>Wait for the AI to extract the text</li>
                <li>Copy or download the extracted text</li>
              </ol>
              <p className="text-xs text-blue-700 mt-3">
                ✨ Supports medical reports with automatic summarization
              </p>
            </div>
          )}
        </div>
          
          {/* Right Column: Resource Library Upload */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                RESOURCE LIBRARY
              </h1>
              <p className="text-gray-600">Upload reports directly to the library</p>
            </div>

            {libError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <p className="font-medium mb-1">Error</p>
                <p className="text-sm">{libError}</p>
              </div>
            )}

            {libSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                <p className="font-medium mb-1">Success</p>
                <p className="text-sm">{libSuccess}</p>
              </div>
            )}

            <form onSubmit={handleResourceLibrarySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                <input type="text" required value={libTitle} onChange={(e) => setLibTitle(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. X_RAY_01" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username <span className="text-red-500">*</span></label>
                <input type="text" disabled value={localStorage.getItem('userEmail') || ''} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" placeholder="e.g. user@example.com" />
                <p className="text-xs text-gray-500 mt-1">Automatically filled from logged-in user.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name <span className="text-red-500">*</span></label>
                <input type="text" required value={libDoctorName} onChange={(e) => setLibDoctorName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. Swathi" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name <span className="text-red-500">*</span></label>
                <input type="text" required value={libHospitalName} onChange={(e) => setLibHospitalName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. BGS" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date <span className="text-red-500">*</span></label>
                <input type="date" required value={libDate} onChange={(e) => setLibDate(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input type="text" value={libSubject} onChange={(e) => setLibSubject(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. subject" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <input type="text" value={libType} onChange={(e) => setLibType(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. type" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">File <span className="text-red-500">*</span></label>
                <input id="lib-file" type="file" required onChange={(e) => setLibFile(e.target.files[0])} className="w-full border border-gray-300 rounded-lg focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200" />
              </div>

              <button type="submit" disabled={libLoading} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center mt-6">
                {libLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Uploading...
                  </>
                ) : (
                  'Upload to Library'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}