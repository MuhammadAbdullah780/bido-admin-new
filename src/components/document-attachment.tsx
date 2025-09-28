'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Upload, 
  FileText, 
  Image, 
  File, 
  X, 
  Check,
  Truck,
  Receipt,
  DollarSign,
  AlertCircle
} from "lucide-react";

interface DocumentAttachmentProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (data: DocumentData) => void;
  auctionId?: string;
  title?: string;
  description?: string;
}

interface DocumentData {
  type: string;
  file: File | null;
  notes: string;
}

const documentTypes = [
  { value: "delivery_note", label: "Delivery Note", icon: Truck, color: "text-blue-500" },
  { value: "service_invoice", label: "Service Invoice", icon: Receipt, color: "text-green-500" },
  { value: "proof_of_funds", label: "Proof of Funds", icon: DollarSign, color: "text-purple-500" },
  { value: "bank_statement", label: "Bank Statement", icon: FileText, color: "text-gray-500" },
  { value: "receipt", label: "Receipt", icon: Receipt, color: "text-orange-500" },
  { value: "contract", label: "Contract", icon: File, color: "text-indigo-500" },
  { value: "other", label: "Other", icon: FileText, color: "text-gray-500" }
];

const acceptedFileTypes = {
  delivery_note: [".pdf", ".jpg", ".jpeg", ".png"],
  service_invoice: [".pdf", ".jpg", ".jpeg", ".png"],
  proof_of_funds: [".pdf", ".jpg", ".jpeg", ".png"],
  bank_statement: [".pdf", ".jpg", ".jpeg", ".png"],
  receipt: [".pdf", ".jpg", ".jpeg", ".png"],
  contract: [".pdf", ".doc", ".docx"],
  other: [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"]
};

export default function DocumentAttachment({ 
  isOpen, 
  onClose, 
  onUpload, 
  auctionId,
  title = "Upload Document",
  description = "Upload a financial document"
}: DocumentAttachmentProps) {
  const [documentData, setDocumentData] = useState<DocumentData>({
    type: "",
    file: null,
    notes: ""
  });
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const selectedDocumentType = documentTypes.find(dt => dt.value === documentData.type);
  const IconComponent = selectedDocumentType?.icon || FileText;

  const handleFileChange = (file: File | null) => {
    setDocumentData(prev => ({ ...prev, file }));
    setErrors(prev => ({ ...prev, file: "" }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!documentData.type) {
      newErrors.type = "Please select a document type";
    }

    if (!documentData.file) {
      newErrors.file = "Please select a file";
    } else {
      const fileExtension = '.' + documentData.file.name.split('.').pop()?.toLowerCase();
      const allowedTypes = acceptedFileTypes[documentData.type as keyof typeof acceptedFileTypes] || [];
      
      if (!allowedTypes.includes(fileExtension)) {
        newErrors.file = `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`;
      }

      if (documentData.file.size > 10 * 1024 * 1024) { // 10MB limit
        newErrors.file = "File size must be less than 10MB";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpload = () => {
    if (!validateForm()) {
      return;
    }

    onUpload(documentData);
    setDocumentData({ type: "", file: null, notes: "" });
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setDocumentData({ type: "", file: null, notes: "" });
    setErrors({});
    onClose();
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <Image className="h-4 w-4 text-blue-500" />;
      case 'doc':
      case 'docx':
        return <File className="h-4 w-4 text-blue-600" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] w-[95vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            {title}
          </DialogTitle>
          <DialogDescription>
            {description}
            {auctionId && ` for auction ${auctionId}`}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Document Type Selection */}
          <div className="space-y-3">
            <label htmlFor="document-type" className="text-sm font-medium">
              Document Type *
            </label>
            <Select 
              value={documentData.type} 
              onValueChange={(value) => {
                setDocumentData(prev => ({ ...prev, type: value }));
                setErrors(prev => ({ ...prev, type: "" }));
              }}
            >
              <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <IconComponent className={`h-4 w-4 ${type.color}`} />
                        {type.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.type}
              </p>
            )}
          </div>

          {/* File Upload Area */}
          <div className="space-y-3">
            <label className="text-sm font-medium">File Upload *</label>
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive 
                  ? "border-blue-500 bg-blue-50" 
                  : errors.file 
                    ? "border-red-500 bg-red-50" 
                    : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept={documentData.type ? acceptedFileTypes[documentData.type as keyof typeof acceptedFileTypes]?.join(',') : "*"}
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              {documentData.file ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    {getFileIcon(documentData.file.name)}
                    <span className="text-sm font-medium">{documentData.file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFileChange(null)}
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    {(documentData.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      {documentData.type && acceptedFileTypes[documentData.type as keyof typeof acceptedFileTypes] 
                        ? `Accepted formats: ${acceptedFileTypes[documentData.type as keyof typeof acceptedFileTypes].join(', ')}`
                        : "Select a document type first"
                      }
                    </p>
                    <p className="text-xs text-gray-500">Max file size: 10MB</p>
                  </div>
                </div>
              )}
            </div>
            {errors.file && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.file}
              </p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-3">
            <label htmlFor="document-notes" className="text-sm font-medium">
              Notes
            </label>
            <Textarea
              id="document-notes"
              placeholder="Enter any additional notes about this document..."
              value={documentData.notes}
              onChange={(e) => setDocumentData(prev => ({ ...prev, notes: e.target.value }))}
              className="min-h-[80px]"
            />
          </div>

          {/* Document Type Info */}
          {selectedDocumentType && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <IconComponent className={`h-5 w-5 ${selectedDocumentType.color}`} />
                <span className="font-medium">{selectedDocumentType.label}</span>
              </div>
              <p className="text-sm text-gray-600">
                {documentData.type === "delivery_note" && "Upload proof of delivery or shipping documentation."}
                {documentData.type === "service_invoice" && "Upload the service invoice or billing document."}
                {documentData.type === "proof_of_funds" && "Upload bank statements or financial documents showing available funds."}
                {documentData.type === "bank_statement" && "Upload recent bank statements for verification."}
                {documentData.type === "receipt" && "Upload payment receipts or transaction confirmations."}
                {documentData.type === "contract" && "Upload signed contracts or agreements."}
                {documentData.type === "other" && "Upload any other relevant financial document."}
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleUpload}
            disabled={!documentData.type || !documentData.file}
            className="w-full sm:w-auto"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
