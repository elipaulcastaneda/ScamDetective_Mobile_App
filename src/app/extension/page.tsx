import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';

export default function ExtensionPage() {
  return (
    <div className="flex justify-center items-start pt-10">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">ScamDetective Browser Extension</CardTitle>
          <CardDescription>Stay protected across the web with real-time scam detection.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
             <Image
              src="https://picsum.photos/800/450"
              alt="Browser extension screenshot"
              width={800}
              height={450}
              data-ai-hint="browser security"
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Why Install?</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><span className="font-semibold text-foreground">Automatic Scanning:</span> Automatically scans websites for scam indicators in the background.</li>
              <li><span className="font-semibold text-foreground">Instant Alerts:</span> Receive immediate notifications if you land on a suspicious or malicious site.</li>
              <li><span className="font-semibold text-foreground">Seamless Integration:</span> Works quietly in your browser without slowing you down.</li>
              <li><span className="font-semibold text-foreground">One-Click Analysis:</span> Easily analyze text on any page by right-clicking and selecting 'Scan with ScamDetective'.</li>
            </ul>
          </div>
           <div>
            <h3 className="text-xl font-semibold mb-4">Download Now</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button size="lg" disabled>
                <Download className="mr-2 h-5 w-5" />
                For Chrome (soon)
              </Button>
              <Button size="lg" disabled>
                <Download className="mr-2 h-5 w-5" />
                For Firefox (soon)
              </Button>
              <Button size="lg" disabled>
                <Download className="mr-2 h-5 w-5" />
                Other Browsers (soon)
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
