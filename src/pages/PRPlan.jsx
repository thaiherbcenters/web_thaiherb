import React, { useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const PRPlan = () => {
    const { t } = useTranslation();

    useEffect(() => {
        // Scroll to top when mounting
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pr-plan-page" style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)', backgroundColor: '#333' }}>
            <div style={{ width: '100vw', height: 'calc(100vh - 80px)', margin: '0', padding: '0', overflow: 'hidden' }}>
                <iframe 
                    src="/pr-plan-mou.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 'none', display: 'block', margin: 0, padding: 0 }}
                    title="PR Plan PDF Viewer"
                >
                    <p>It appears your web browser doesn't support iframes or PDF viewing. You can <a href="/pr-plan-mou.pdf">download the PDF</a> to view it.</p>
                </iframe>
            </div>
        </div>
    );
};

export default PRPlan;
