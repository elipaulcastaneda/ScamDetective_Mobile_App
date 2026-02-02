import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Globe, CheckCircle2, Chrome, AlertCircle } from 'lucide-react';

export default function ExtensionPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Browser Protection Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Globe className="h-6 w-6" />
              Browser Protection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Install our browser extension to get real-time protection while browsing the web. Our extension automatically scans websites, emails, and other content to detect potential scams before they can harm you.
            </p>

            <div>
              <h3 className="font-semibold text-lg mb-3">Key Features:</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Real-time website scanning while browsing</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Automatic phishing detection</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Email content analysis</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Social media scam alerts</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Safe browsing recommendations</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>One-click reporting of suspicious content</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Stay Protected</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Our extension works silently in the background, only alerting you when potential threats are detected. Browse with confidence knowing you're protected.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Download Extension Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Download Extension (Chrome Only)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Chrome Download */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Chrome className="h-10 w-10 text-blue-600" />
                <div>
                  <p className="font-semibold">Chrome</p>
                  <p className="text-sm text-muted-foreground">Available on Chrome Web Store</p>
                </div>
              </div>
              <Button disabled>
                <Download className="h-4 w-4 mr-2" />
                Install
              </Button>
            </div>

            {/* Setup Instructions */}
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Setup Instructions</h3>
              <ol className="space-y-2 text-sm text-amber-900 dark:text-amber-100">
                <li><span className="font-medium">1.</span> Click "Install" to open the Chrome Web Store</li>
                <li><span className="font-medium">2.</span> Follow the installation prompts</li>
                <li><span className="font-medium">3.</span> Pin the extension to your toolbar</li>
                <li><span className="font-medium">4.</span> Sign in with your Scam Detective account</li>
                <li><span className="font-medium">5.</span> Start browsing with enhanced protection</li>
              </ol>
            </div>

            {/* Extension Status */}
            <div>
              <h3 className="font-semibold mb-3">Extension Status</h3>
              <div className="flex items-start gap-3 text-muted-foreground">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Extension not detected</p>
                  <p className="text-sm">Install the extension to see real-time status here</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
