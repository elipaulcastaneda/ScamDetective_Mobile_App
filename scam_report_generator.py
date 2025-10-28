import json
from datetime import datetime
from typing import Dict, Any, Optional
from dataclasses import dataclass

@dataclass
class ScamReport:
    scam_type: str
    confidence_score: float
    email_subject: str
    email_sender: str
    detection_date: datetime
    suspicious_indicators: list
    recommended_authority: str
    risk_level: str
    financial_indicators: Optional[Dict[str, Any]] = None
    attachments_info: Optional[Dict[str, Any]] = None

class ReportGenerator:
    def __init__(self):
        self.authority_mapping = {
            'investment_fraud': 'SEC',
            'wire_fraud': 'FBI IC3',
            'identity_theft': 'FTC',
            'romance_scam': 'FBI IC3',
            'tech_support': 'FTC',
            'business_email': 'FBI IC3'
        }
        
        self.risk_thresholds = {
            'HIGH': 0.8,
            'MEDIUM': 0.5,
            'LOW': 0.2
        }

    def determine_risk_level(self, confidence_score: float) -> str:
        """Determine risk level based on model confidence score."""
        if confidence_score >= self.risk_thresholds['HIGH']:
            return 'HIGH'
        elif confidence_score >= self.risk_thresholds['MEDIUM']:
            return 'MEDIUM'
        elif confidence_score >= self.risk_thresholds['LOW']:
            return 'LOW'
        return 'MINIMAL'

    def get_reporting_authority(self, scam_type: str) -> str:
        """Determine appropriate reporting authority based on scam type."""
        return self.authority_mapping.get(scam_type, 'FTC')

    def generate_report(self, model_results: Dict[str, Any]) -> ScamReport:
        """Generate a structured report from model results."""
        risk_level = self.determine_risk_level(model_results['confidence_score'])
        authority = self.get_reporting_authority(model_results['scam_type'])

        report = ScamReport(
            scam_type=model_results['scam_type'],
            confidence_score=model_results['confidence_score'],
            email_subject=model_results['email_subject'],
            email_sender=model_results['sender'],
            detection_date=datetime.now(),
            suspicious_indicators=model_results.get('indicators', []),
            recommended_authority=authority,
            risk_level=risk_level,
            financial_indicators=model_results.get('financial_data'),
            attachments_info=model_results.get('attachments')
        )
        return report

    def export_report_json(self, report: ScamReport, filepath: Optional[str] = None) -> str:
        """Export the report to JSON format."""
        report_dict = {
            'report_id': f'SCAM-{datetime.now().strftime("%Y%m%d-%H%M%S")}',
            'scam_type': report.scam_type,
            'risk_level': report.risk_level,
            'confidence_score': report.confidence_score,
            'detection_date': report.detection_date.isoformat(),
            'email_details': {
                'subject': report.email_subject,
                'sender': report.email_sender
            },
            'suspicious_indicators': report.suspicious_indicators,
            'recommended_authority': report.recommended_authority,
            'financial_indicators': report.financial_indicators,
            'attachments_info': report.attachments_info
        }
        
        if filepath:
            with open(filepath, 'w') as f:
                json.dump(report_dict, f, indent=4)
                return filepath
        
        return json.dumps(report_dict, indent=4)

    def generate_authority_report(self, report: ScamReport) -> Dict[str, Any]:
        """Generate authority-specific report format."""
        if report.recommended_authority == 'FBI IC3':
            return self._generate_ic3_report(report)
        elif report.recommended_authority == 'FTC':
            return self._generate_ftc_report(report)
        elif report.recommended_authority == 'SEC':
            return self._generate_sec_report(report)
        else:
            return self._generate_generic_report(report)

    def _generate_ic3_report(self, report: ScamReport) -> Dict[str, Any]:
        """Generate report in FBI IC3 format."""
        return {
            'complaint_type': report.scam_type,
            'incident_date': report.detection_date.strftime('%Y-%m-%d'),
            'sender_email': report.email_sender,
            'incident_details': {
                'subject': report.email_subject,
                'indicators': report.suspicious_indicators,
                'risk_level': report.risk_level,
                'confidence': report.confidence_score
            },
            'financial_impact': report.financial_indicators
        }

    def _generate_ftc_report(self, report: ScamReport) -> Dict[str, Any]:
        """Generate report in FTC format."""
        return {
            'complaint_type': 'SCAM',
            'fraud_type': report.scam_type,
            'date_received': report.detection_date.strftime('%Y-%m-%d'),
            'contact_info': {
                'email': report.email_sender
            },
            'complaint_details': {
                'email_subject': report.email_subject,
                'risk_assessment': report.risk_level,
                'detection_confidence': report.confidence_score,
                'suspicious_elements': report.suspicious_indicators
            }
        }

    def _generate_sec_report(self, report: ScamReport) -> Dict[str, Any]:
        """Generate report in SEC format."""
        return {
            'tip_type': 'SUSPECTED_SCAM',
            'fraud_category': report.scam_type,
            'detection_info': {
                'date': report.detection_date.strftime('%Y-%m-%d'),
                'confidence': report.confidence_score,
                'risk_rating': report.risk_level
            },
            'subject_info': {
                'email': report.email_sender,
                'communication_subject': report.email_subject
            },
            'supporting_details': {
                'indicators': report.suspicious_indicators,
                'financial_data': report.financial_indicators
            }
        }

    def _generate_generic_report(self, report: ScamReport) -> Dict[str, Any]:
        """Generate report in a generic format."""
        return {
            'incident_type': 'SCAM',
            'scam_category': report.scam_type,
            'incident_date': report.detection_date.strftime('%Y-%m-%d'),
            'risk_assessment': report.risk_level,
            'detection_details': {
                'confidence': report.confidence_score,
                'indicators': report.suspicious_indicators
            },
            'source_info': {
                'email': report.email_sender,
                'subject': report.email_subject
            },
            'additional_data': {
                'financial_indicators': report.financial_indicators,
                'attachments': report.attachments_info
            }
        }

# Example usage:
if __name__ == '__main__':
    # Sample model results
    sample_results = {
        'scam_type': 'investment_fraud',
        'confidence_score': 0.85,
        'email_subject': 'Guaranteed Investment Returns!!!',
        'sender': 'suspicious@example.com',
        'indicators': [
            'Multiple exclamation marks',
            'Urgency in language',
            'Unrealistic returns promised',
            'Pressure tactics'
        ],
        'financial_data': {
            'mentioned_amount': '$50,000',
            'requested_payment_method': 'cryptocurrency'
        },
        'attachments': {
            'count': 1,
            'types': ['pdf'],
            'names': ['investment_opportunity.pdf']
        }
    }

    # Create report generator and generate report
    generator = ReportGenerator()
    report = generator.generate_report(sample_results)
    
    # Export report to JSON
    json_report = generator.export_report_json(report)
    print("Generated Report:")
    print(json_report)
    
    # Generate authority-specific report
    authority_report = generator.generate_authority_report(report)
    print("\nAuthority-Specific Report:")
    print(json.dumps(authority_report, indent=4))
