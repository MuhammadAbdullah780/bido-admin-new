'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { JsonTable, StatusBadge, ActionButtons } from "@/components/ui/json-table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { 
  Settings, 
  Clock, 
  Tag, 
  BookOpen, 
  FileText, 
  Globe, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  AlertCircle,
  CheckCircle,
  Languages
} from "lucide-react";

type Props = {};

// Sample data for platform settings
const platformSettings = {
  auctionConfig: {
    defaultCloseTime: "18:00",
    timezone: "UTC+3",
    autoCloseEnabled: true,
    extensionTime: 15, // minutes
  },
  categories: [
    { id: 1, name: "Electronics", subcategories: ["Smartphones", "Laptops", "Cameras", "Audio"], isActive: true },
    { id: 2, name: "Fashion", subcategories: ["Men's Clothing", "Women's Clothing", "Shoes", "Accessories"], isActive: true },
    { id: 3, name: "Home & Garden", subcategories: ["Furniture", "Decor", "Kitchen", "Garden"], isActive: true },
    { id: 4, name: "Art & Collectibles", subcategories: ["Paintings", "Sculptures", "Antiques", "Coins"], isActive: true },
    { id: 5, name: "Vehicles", subcategories: ["Cars", "Motorcycles", "Boats", "Parts"], isActive: false },
  ],
  tutorials: {
    english: [
      { id: 1, title: "How to Create an Account", content: "Step-by-step guide to creating your account...", isPublished: true },
      { id: 2, title: "How to Place a Bid", content: "Learn how to place bids on auctions...", isPublished: true },
      { id: 3, title: "Payment Methods", content: "Available payment methods and how to use them...", isPublished: false },
    ],
    arabic: [
      { id: 1, title: "كيفية إنشاء حساب", content: "دليل خطوة بخطوة لإنشاء حسابك...", isPublished: true },
      { id: 2, title: "كيفية وضع مزايدة", content: "تعلم كيفية وضع مزايدات في المزادات...", isPublished: true },
      { id: 3, title: "طرق الدفع", content: "طرق الدفع المتاحة وكيفية استخدامها...", isPublished: false },
    ]
  },
  platformTerms: {
    title: "Platform Terms of Service",
    content: "By using this platform, you agree to the following terms...",
    lastUpdated: "2024-01-15",
    isActive: true,
  },
  deliveryAgreements: {
    title: "Delivery Terms and Conditions",
    content: "Delivery terms and conditions for all transactions...",
    lastUpdated: "2024-01-15",
    isActive: true,
  },
  staticPages: [
    { id: 1, title: "About Us", slug: "about-us", content: "Learn more about our platform...", isPublished: true },
    { id: 2, title: "Contact Us", slug: "contact-us", content: "Get in touch with our team...", isPublished: true },
    { id: 3, title: "Privacy Policy", slug: "privacy-policy", content: "Our privacy policy and data protection...", isPublished: true },
    { id: 4, title: "Help Center", slug: "help-center", content: "Frequently asked questions and support...", isPublished: false },
  ]
};

const page = (props: Props) => {
  const [settings, setSettings] = useState(platformSettings);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);
  const [isStaticPageModalOpen, setIsStaticPageModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [editingTutorial, setEditingTutorial] = useState<any>(null);
  const [editingStaticPage, setEditingStaticPage] = useState<any>(null);
  const [tutorialLanguage, setTutorialLanguage] = useState<"english" | "arabic">("english");
  const [newCategory, setNewCategory] = useState({ name: "", subcategories: [""] });
  const [newTutorial, setNewTutorial] = useState({ title: "", content: "", isPublished: false });
  const [newStaticPage, setNewStaticPage] = useState({ title: "", slug: "", content: "", isPublished: false });

  const handleSaveAuctionConfig = () => {
    // Simulate saving auction configuration
    console.log("Auction configuration saved:", settings.auctionConfig);
    // Show success message
  };

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) return;
    
    const category = {
      id: Date.now(),
      name: newCategory.name,
      subcategories: newCategory.subcategories.filter(sub => sub.trim()),
      isActive: true
    };
    
    setSettings(prev => ({
      ...prev,
      categories: [...prev.categories, category]
    }));
    
    setNewCategory({ name: "", subcategories: [""] });
    setIsCategoryModalOpen(false);
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.name,
      subcategories: [...category.subcategories, ""]
    });
    setIsCategoryModalOpen(true);
  };

  const handleUpdateCategory = () => {
    if (!editingCategory || !newCategory.name.trim()) return;
    
    setSettings(prev => ({
      ...prev,
      categories: prev.categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, name: newCategory.name, subcategories: newCategory.subcategories.filter(sub => sub.trim()) }
          : cat
      )
    }));
    
    setEditingCategory(null);
    setNewCategory({ name: "", subcategories: [""] });
    setIsCategoryModalOpen(false);
  };

  const handleDeleteCategory = (categoryId: number) => {
    setSettings(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat.id !== categoryId)
    }));
  };

  const handleToggleCategoryStatus = (categoryId: number) => {
    setSettings(prev => ({
      ...prev,
      categories: prev.categories.map(cat => 
        cat.id === categoryId ? { ...cat, isActive: !cat.isActive } : cat
      )
    }));
  };

  const handleAddTutorial = () => {
    if (!newTutorial.title.trim() || !newTutorial.content.trim()) return;
    
    const tutorial = {
      id: Date.now(),
      ...newTutorial
    };
    
    setSettings(prev => ({
      ...prev,
      tutorials: {
        ...prev.tutorials,
        [tutorialLanguage]: [...prev.tutorials[tutorialLanguage], tutorial]
      }
    }));
    
    setNewTutorial({ title: "", content: "", isPublished: false });
    setIsTutorialModalOpen(false);
  };

  const handleEditTutorial = (tutorial: any) => {
    setEditingTutorial(tutorial);
    setNewTutorial({
      title: tutorial.title,
      content: tutorial.content,
      isPublished: tutorial.isPublished
    });
    setIsTutorialModalOpen(true);
  };

  const handleUpdateTutorial = () => {
    if (!editingTutorial || !newTutorial.title.trim() || !newTutorial.content.trim()) return;
    
    setSettings(prev => ({
      ...prev,
      tutorials: {
        ...prev.tutorials,
        [tutorialLanguage]: prev.tutorials[tutorialLanguage].map(tut => 
          tut.id === editingTutorial.id ? { ...tut, ...newTutorial } : tut
        )
      }
    }));
    
    setEditingTutorial(null);
    setNewTutorial({ title: "", content: "", isPublished: false });
    setIsTutorialModalOpen(false);
  };

  const handleDeleteTutorial = (tutorialId: number) => {
    setSettings(prev => ({
      ...prev,
      tutorials: {
        ...prev.tutorials,
        [tutorialLanguage]: prev.tutorials[tutorialLanguage].filter(tut => tut.id !== tutorialId)
      }
    }));
  };

  const handleAddStaticPage = () => {
    if (!newStaticPage.title.trim() || !newStaticPage.slug.trim() || !newStaticPage.content.trim()) return;
    
    const page = {
      id: Date.now(),
      ...newStaticPage
    };
    
    setSettings(prev => ({
      ...prev,
      staticPages: [...prev.staticPages, page]
    }));
    
    setNewStaticPage({ title: "", slug: "", content: "", isPublished: false });
    setIsStaticPageModalOpen(false);
  };

  const handleEditStaticPage = (page: any) => {
    setEditingStaticPage(page);
    setNewStaticPage({
      title: page.title,
      slug: page.slug,
      content: page.content,
      isPublished: page.isPublished
    });
    setIsStaticPageModalOpen(true);
  };

  const handleUpdateStaticPage = () => {
    if (!editingStaticPage || !newStaticPage.title.trim() || !newStaticPage.slug.trim() || !newStaticPage.content.trim()) return;
    
    setSettings(prev => ({
      ...prev,
      staticPages: prev.staticPages.map(p => 
        p.id === editingStaticPage.id ? { ...p, ...newStaticPage } : p
      )
    }));
    
    setEditingStaticPage(null);
    setNewStaticPage({ title: "", slug: "", content: "", isPublished: false });
    setIsStaticPageModalOpen(false);
  };

  const handleDeleteStaticPage = (pageId: number) => {
    setSettings(prev => ({
      ...prev,
      staticPages: prev.staticPages.filter(p => p.id !== pageId)
    }));
  };

  const addSubcategory = () => {
    setNewCategory(prev => ({
      ...prev,
      subcategories: [...prev.subcategories, ""]
    }));
  };

  const removeSubcategory = (index: number) => {
    setNewCategory(prev => ({
      ...prev,
      subcategories: prev.subcategories.filter((_, i) => i !== index)
    }));
  };

  const updateSubcategory = (index: number, value: string) => {
    setNewCategory(prev => ({
      ...prev,
      subcategories: prev.subcategories.map((sub, i) => i === index ? value : sub)
    }));
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-3">
        <Settings className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-medium">Platform Settings</h1>
      </div>

      <Tabs defaultValue="auction" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="auction">Auction Config</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="terms">Terms & Agreements</TabsTrigger>
          <TabsTrigger value="pages">Static Pages</TabsTrigger>
        </TabsList>

        {/* Auction Configuration */}
        <TabsContent value="auction" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Auction Configuration
              </CardTitle>
              <CardDescription>
                Configure default auction settings and timing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="close-time">Default Auction Close Time</Label>
                  <Input
                    id="close-time"
                    type="time"
                    value={settings.auctionConfig.defaultCloseTime}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      auctionConfig: { ...prev.auctionConfig, defaultCloseTime: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={settings.auctionConfig.timezone}
                    onValueChange={(value) => setSettings(prev => ({
                      ...prev,
                      auctionConfig: { ...prev.auctionConfig, timezone: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC+0">UTC+0 (GMT)</SelectItem>
                      <SelectItem value="UTC+1">UTC+1 (CET)</SelectItem>
                      <SelectItem value="UTC+2">UTC+2 (EET)</SelectItem>
                      <SelectItem value="UTC+3">UTC+3 (AST)</SelectItem>
                      <SelectItem value="UTC+4">UTC+4 (GST)</SelectItem>
                      <SelectItem value="UTC+5">UTC+5 (PKT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="auto-close"
                  checked={settings.auctionConfig.autoCloseEnabled}
                  onCheckedChange={(checked) => setSettings(prev => ({
                    ...prev,
                    auctionConfig: { ...prev.auctionConfig, autoCloseEnabled: checked }
                  }))}
                />
                <Label htmlFor="auto-close">Enable automatic auction closing</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="extension-time">Extension Time (minutes)</Label>
                <Input
                  id="extension-time"
                  type="number"
                  value={settings.auctionConfig.extensionTime}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    auctionConfig: { ...prev.auctionConfig, extensionTime: parseInt(e.target.value) }
                  }))}
                />
              </div>
              
              <Button onClick={handleSaveAuctionConfig} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Auction Configuration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Management */}
        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Categories & Subcategories
                  </CardTitle>
                  <CardDescription>
                    Manage auction categories and their subcategories
                  </CardDescription>
                </div>
                <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => {
                      setEditingCategory(null);
                      setNewCategory({ name: "", subcategories: [""] });
                    }}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Category
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {editingCategory ? "Edit Category" : "Add New Category"}
                      </DialogTitle>
                      <DialogDescription>
                        {editingCategory ? "Update category details" : "Create a new auction category"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="category-name">Category Name</Label>
                        <Input
                          id="category-name"
                          value={newCategory.name}
                          onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter category name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Subcategories</Label>
                        {newCategory.subcategories.map((sub, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={sub}
                              onChange={(e) => updateSubcategory(index, e.target.value)}
                              placeholder="Enter subcategory name"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeSubcategory(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addSubcategory}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Subcategory
                        </Button>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsCategoryModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={editingCategory ? handleUpdateCategory : handleAddCategory}>
                        {editingCategory ? "Update" : "Add"} Category
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <JsonTable
                data={settings.categories}
                columns={[
                  {
                    key: "name",
                    label: "Category",
                    className: "col-span-3 font-medium"
                  },
                  {
                    key: "subcategories",
                    label: "Subcategories",
                    className: "col-span-4",
                    render: (subcategories: string[]) => (
                      <div className="flex flex-wrap gap-1">
                        {subcategories.map((sub, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {sub}
                          </Badge>
                        ))}
                      </div>
                    )
                  },
                  {
                    key: "isActive",
                    label: "Status",
                    className: "col-span-2",
                    render: (isActive: boolean) => (
                      <StatusBadge status={isActive} />
                    )
                  }
                ]}
                actions={(category) => (
                  <ActionButtons
                    onEdit={() => handleEditCategory(category)}
                    onToggle={() => handleToggleCategoryStatus(category.id)}
                    onDelete={() => handleDeleteCategory(category.id)}
                    toggleText={category.isActive ? "Deactivate" : "Activate"}
                    editIcon={<Edit className="w-4 h-4" />}
                    deleteIcon={<Trash2 className="w-4 h-4" />}
                  />
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tutorials Management */}
        <TabsContent value="tutorials" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Platform Tutorials
                  </CardTitle>
                  <CardDescription>
                    Manage platform tutorials in English and Arabic
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={tutorialLanguage} onValueChange={(value: "english" | "arabic") => setTutorialLanguage(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="arabic">العربية</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog open={isTutorialModalOpen} onOpenChange={setIsTutorialModalOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={() => {
                        setEditingTutorial(null);
                        setNewTutorial({ title: "", content: "", isPublished: false });
                      }}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Tutorial
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>
                          {editingTutorial ? "Edit Tutorial" : "Add New Tutorial"} ({tutorialLanguage === "english" ? "English" : "Arabic"})
                        </DialogTitle>
                        <DialogDescription>
                          {editingTutorial ? "Update tutorial content" : "Create a new tutorial"}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="tutorial-title">Tutorial Title</Label>
                          <Input
                            id="tutorial-title"
                            value={newTutorial.title}
                            onChange={(e) => setNewTutorial(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Enter tutorial title"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tutorial-content">Tutorial Content</Label>
                          <Textarea
                            id="tutorial-content"
                            value={newTutorial.content}
                            onChange={(e) => setNewTutorial(prev => ({ ...prev, content: e.target.value }))}
                            placeholder="Enter tutorial content"
                            className="min-h-[200px]"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="tutorial-published"
                            checked={newTutorial.isPublished}
                            onCheckedChange={(checked) => setNewTutorial(prev => ({ ...prev, isPublished: checked }))}
                          />
                          <Label htmlFor="tutorial-published">Published</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsTutorialModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={editingTutorial ? handleUpdateTutorial : handleAddTutorial}>
                          {editingTutorial ? "Update" : "Add"} Tutorial
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <JsonTable
                data={settings.tutorials[tutorialLanguage]}
                columns={[
                  {
                    key: "title",
                    label: "Title",
                    className: "col-span-3 font-medium"
                  },
                  {
                    key: "content",
                    label: "Content Preview",
                    className: "col-span-5 max-w-xs truncate"
                  },
                  {
                    key: "isPublished",
                    label: "Status",
                    className: "col-span-2",
                    render: (isPublished: boolean) => (
                      <StatusBadge 
                        status={isPublished} 
                        activeText="Published" 
                        inactiveText="Draft" 
                      />
                    )
                  }
                ]}
                actions={(tutorial) => (
                  <ActionButtons
                    onEdit={() => handleEditTutorial(tutorial)}
                    onDelete={() => handleDeleteTutorial(tutorial.id)}
                    editIcon={<Edit className="w-4 h-4" />}
                    deleteIcon={<Trash2 className="w-4 h-4" />}
                  />
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Terms & Agreements */}
        <TabsContent value="terms" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Platform Terms of Service
                </CardTitle>
                <CardDescription>
                  Manage platform terms and conditions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="terms-title">Title</Label>
                  <Input
                    id="terms-title"
                    value={settings.platformTerms.title}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      platformTerms: { ...prev.platformTerms, title: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="terms-content">Content</Label>
                  <Textarea
                    id="terms-content"
                    value={settings.platformTerms.content}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      platformTerms: { ...prev.platformTerms, content: e.target.value }
                    }))}
                    className="min-h-[200px]"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="terms-active"
                    checked={settings.platformTerms.isActive}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      platformTerms: { ...prev.platformTerms, isActive: checked }
                    }))}
                  />
                  <Label htmlFor="terms-active">Active</Label>
                </div>
                <Button className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Terms of Service
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Delivery Agreements
                </CardTitle>
                <CardDescription>
                  Manage delivery terms and conditions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="delivery-title">Title</Label>
                  <Input
                    id="delivery-title"
                    value={settings.deliveryAgreements.title}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      deliveryAgreements: { ...prev.deliveryAgreements, title: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="delivery-content">Content</Label>
                  <Textarea
                    id="delivery-content"
                    value={settings.deliveryAgreements.content}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      deliveryAgreements: { ...prev.deliveryAgreements, content: e.target.value }
                    }))}
                    className="min-h-[200px]"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="delivery-active"
                    checked={settings.deliveryAgreements.isActive}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      deliveryAgreements: { ...prev.deliveryAgreements, isActive: checked }
                    }))}
                  />
                  <Label htmlFor="delivery-active">Active</Label>
                </div>
                <Button className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Delivery Agreements
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Static Pages */}
        <TabsContent value="pages" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Static Pages
                  </CardTitle>
                  <CardDescription>
                    Manage static pages like About Us, Contact Us, etc.
                  </CardDescription>
                </div>
                <Dialog open={isStaticPageModalOpen} onOpenChange={setIsStaticPageModalOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => {
                      setEditingStaticPage(null);
                      setNewStaticPage({ title: "", slug: "", content: "", isPublished: false });
                    }}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Page
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {editingStaticPage ? "Edit Static Page" : "Add New Static Page"}
                      </DialogTitle>
                      <DialogDescription>
                        {editingStaticPage ? "Update page content" : "Create a new static page"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="page-title">Page Title</Label>
                        <Input
                          id="page-title"
                          value={newStaticPage.title}
                          onChange={(e) => setNewStaticPage(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Enter page title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="page-slug">Page Slug</Label>
                        <Input
                          id="page-slug"
                          value={newStaticPage.slug}
                          onChange={(e) => setNewStaticPage(prev => ({ ...prev, slug: e.target.value }))}
                          placeholder="Enter page slug (e.g., about-us)"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="page-content">Page Content</Label>
                        <Textarea
                          id="page-content"
                          value={newStaticPage.content}
                          onChange={(e) => setNewStaticPage(prev => ({ ...prev, content: e.target.value }))}
                          placeholder="Enter page content"
                          className="min-h-[200px]"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="page-published"
                          checked={newStaticPage.isPublished}
                          onCheckedChange={(checked) => setNewStaticPage(prev => ({ ...prev, isPublished: checked }))}
                        />
                        <Label htmlFor="page-published">Published</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsStaticPageModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={editingStaticPage ? handleUpdateStaticPage : handleAddStaticPage}>
                        {editingStaticPage ? "Update" : "Add"} Page
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <JsonTable
                data={settings.staticPages}
                columns={[
                  {
                    key: "title",
                    label: "Title",
                    className: "col-span-3 font-medium"
                  },
                  {
                    key: "slug",
                    label: "Slug",
                    className: "col-span-2 font-mono text-sm"
                  },
                  {
                    key: "content",
                    label: "Content Preview",
                    className: "col-span-4 max-w-xs truncate"
                  },
                  {
                    key: "isPublished",
                    label: "Status",
                    className: "col-span-1",
                    render: (isPublished: boolean) => (
                      <StatusBadge 
                        status={isPublished} 
                        activeText="Published" 
                        inactiveText="Draft" 
                      />
                    )
                  }
                ]}
                actions={(page) => (
                  <ActionButtons
                    onEdit={() => handleEditStaticPage(page)}
                    onDelete={() => handleDeleteStaticPage(page.id)}
                    editIcon={<Edit className="w-4 h-4" />}
                    deleteIcon={<Trash2 className="w-4 h-4" />}
                  />
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;

