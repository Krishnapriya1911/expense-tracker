// Central mock data — used when MongoDB is unavailable
const complaints = [
  { id:'#4821', complaintId:'#4821', customer:{name:'Ravi Kumar',phone:'9876543210',account:'UBI0001234'}, type:'UPI Failure',    channel:'call',    priority:'critical', status:'pending',     slaDayCount:26, genomeCluster:'CBS v3.2 Bug',       sentiment:-0.9, rbiRisk:true,  churnRisk:88, description:'UPI transaction failed — Rs.5,400 debited without credit to beneficiary', aiDraft:'Dear Ravi Kumar, We sincerely apologise for the inconvenience caused with your UPI transaction...', createdAt: new Date(Date.now()-26*86400000) },
  { id:'#4820', complaintId:'#4820', customer:{name:'Priya Sharma',phone:'9123456789',account:'UBI0002345'}, type:'EMI Deduction', channel:'email',   priority:'high',     status:'in_progress', slaDayCount:12, genomeCluster:'EMI Round-off',      sentiment:-0.6, rbiRisk:false, churnRisk:62, description:'EMI deducted twice for home loan account this month', aiDraft:'Dear Priya Sharma, We acknowledge your concern regarding the duplicate EMI deduction...', createdAt: new Date(Date.now()-12*86400000) },
  { id:'#4819', complaintId:'#4819', customer:{name:'Arun Nair',phone:'9234567890',account:'UBI0003456'},   type:'ATM Failure',   channel:'branch',  priority:'medium',   status:'resolved',    slaDayCount:3,  genomeCluster:'ATM Network Timeout', sentiment:-0.3, rbiRisk:false, churnRisk:20, description:'ATM card swallowed at Andheri branch ATM machine', aiDraft:'Dear Arun Nair, Your ATM issue has been resolved and your card has been released...', createdAt: new Date(Date.now()-3*86400000) },
  { id:'#4818', complaintId:'#4818', customer:{name:'Meena Pillai',phone:'9345678901',account:'UBI0004567'}, type:'Net Banking',  channel:'app',     priority:'low',      status:'resolved',    slaDayCount:1,  genomeCluster:'Login Error',         sentiment:-0.1, rbiRisk:false, churnRisk:10, description:'Net banking login not working — password reset not received via SMS', aiDraft:'Dear Meena Pillai, Your net banking access has been restored successfully...', createdAt: new Date(Date.now()-1*86400000) },
  { id:'#4817', complaintId:'#4817', customer:{name:'Suresh Babu',phone:'9456789012',account:'UBI0005678'},  type:'Statement',    channel:'email',   priority:'medium',   status:'pending',     slaDayCount:8,  genomeCluster:'PDF Gen Error',       sentiment:-0.4, rbiRisk:false, churnRisk:35, description:'Account statement not generated for last 3 months', aiDraft:'Dear Suresh Babu, Your account statement request has been processed...', createdAt: new Date(Date.now()-8*86400000) },
  { id:'#4816', complaintId:'#4816', customer:{name:'Kavitha Nair',phone:'9567890123',account:'UBI0006789'}, type:'UPI Failure',  channel:'twitter', priority:'critical', status:'pending',     slaDayCount:24, genomeCluster:'CBS v3.2 Bug',        sentiment:-0.8, rbiRisk:true,  churnRisk:79, description:'Multiple UPI failures since CBS update on March 15', aiDraft:'Dear Kavitha Nair, We are aware of the UPI issue affecting some customers post the CBS update...', createdAt: new Date(Date.now()-24*86400000) },
  { id:'#4815', complaintId:'#4815', customer:{name:'Manoj Gupta',phone:'9678901234',account:'UBI0007890'},  type:'Loan EMI',     channel:'call',    priority:'high',     status:'in_progress', slaDayCount:15, genomeCluster:'EMI Round-off',       sentiment:-0.5, rbiRisk:false, churnRisk:48, description:'Personal loan EMI amount different from sanction letter', aiDraft:'Dear Manoj Gupta, We have reviewed your loan EMI discrepancy and will resolve it by...', createdAt: new Date(Date.now()-15*86400000) },
  { id:'#4814', complaintId:'#4814', customer:{name:'Sunita Devi',phone:'9789012345',account:'UBI0008901'},  type:'FD Interest',  channel:'branch',  priority:'medium',   status:'pending',     slaDayCount:5,  genomeCluster:'Interest Calc',       sentiment:-0.3, rbiRisk:false, churnRisk:25, description:'Fixed deposit interest not credited at maturity', aiDraft:'Dear Sunita Devi, Your FD maturity interest will be credited within 2 business days...', createdAt: new Date(Date.now()-5*86400000) },
];

const genomeClusters = [
  { id:'G1', title:'UPI CBS v3.2 Bug', count:147, dna:'branch:Mumbai-Central · product:UPI · cbs_version:3.2 · time:09:00-11:00', severity:89, fix:'Deploy CBS hotfix v3.2.1 — estimated 2hr effort — resolves all 147 tickets', status:'critical' },
  { id:'G2', title:'EMI Round-off Calculation Error', count:89, dna:'product:Home-Loan · branch:Multi · cbs_version:3.1 · time:01:00-03:00', severity:62, fix:'Update EMI calculation formula in CoreBanking module — patch available', status:'high' },
  { id:'G3', title:'ATM Network Timeout', count:34, dna:'product:ATM · branch:Suburban · network:NPCI-3 · time:22:00-02:00', severity:30, fix:'Replace NPCI-3 network switch at 3 suburban branches', status:'medium' },
  { id:'G4', title:'Net Banking Login Failure', count:28, dna:'product:Net-Banking · browser:Chrome-120 · cbs_version:3.2 · time:08:00-09:00', severity:22, fix:'Update session token expiry from 15min to 30min in auth service', status:'low' },
  { id:'G5', title:'FD Interest Calculation', count:19, dna:'product:FD · tenor:12-month · branch:Multi · agent:FD-system', severity:15, fix:'Recalculate interest for all 12-month FDs opened after Jan 1 2026', status:'low' },
];

const radarAlerts = [
  { id:'R1', name:'Deepa Krishnan', account:'UBI0011234', riskScore:94, level:'critical', signals:['3 failed UPIs in 2 hours','5 statement downloads','App crash reported'], predictedIn:'12 hours' },
  { id:'R2', name:'Rohan Mehta',    account:'UBI0022345', riskScore:82, level:'critical', signals:['4 UPI failures','Statement download failed','Login retry × 4'], predictedIn:'18 hours' },
  { id:'R3', name:'Arun Patel',     account:'UBI0033456', riskScore:78, level:'high',     signals:['2 ATM failures','App crash reported','Branch walk-in logged'], predictedIn:'24 hours' },
  { id:'R4', name:'Savitha Reddy',  account:'UBI0044567', riskScore:71, level:'high',     signals:['Cheque bounce','EMI overdue notice','App session timeout'], predictedIn:'30 hours' },
  { id:'R5', name:'Lakshmi Rao',    account:'UBI0055678', riskScore:61, level:'medium',   signals:['NEFT query repeated','Branch visit logged','Balance check × 6'], predictedIn:'36 hours' },
  { id:'R6', name:'Vikram Singh',   account:'UBI0066789', riskScore:58, level:'medium',   signals:['UPI failure × 1','SMS not received for transaction'], predictedIn:'42 hours' },
  { id:'R7', name:'Nandini Kumar',  account:'UBI0077890', riskScore:65, level:'high',     signals:['Card declined twice','Net banking timeout'], predictedIn:'28 hours' },
];

const rbiItems = [
  { id:'C4199', complaintId:'#4199', customer:'Ravi Kumar',    complaint:'UPI failure — Rs.5,400 debited without credit',   day:26, status:'critical' },
  { id:'C4188', complaintId:'#4188', customer:'Manoj Tiwari',  complaint:'Net banking locked — unable to transact 3 days',   day:26, status:'critical' },
  { id:'C4201', complaintId:'#4201', customer:'Sunita Devi',   complaint:'EMI double deduction — account debited twice',      day:23, status:'warning' },
  { id:'C4210', complaintId:'#4210', customer:'Priya Nair',    complaint:'ATM dispense failure — Rs.10,000 not received',     day:21, status:'warning' },
  { id:'C4215', complaintId:'#4215', customer:'Arun Kumar',    complaint:'FD premature closure dispute',                     day:17, status:'safe' },
  { id:'C4220', complaintId:'#4220', customer:'Kavitha S',     complaint:'Home loan statement incorrect balance',             day:14, status:'safe' },
];

const clsData = [
  { id:'CLS1', name:'Deepa Krishnan', complaints:5, score:12, ltv:210000, status:'critical', trend:[-10,-20,-35,-50,-65,-78,-88] },
  { id:'CLS2', name:'Rohan Mehta',    complaints:4, score:18, ltv:185000, status:'critical', trend:[-5,-15,-30,-45,-60,-72,-82] },
  { id:'CLS3', name:'Arun Patel',     complaints:3, score:32, ltv:150000, status:'high',     trend:[10,5,-5,-15,-25,-38,-48] },
  { id:'CLS4', name:'Savitha Reddy',  complaints:3, score:38, ltv:220000, status:'high',     trend:[20,15,10,0,-10,-22,-32] },
  { id:'CLS5', name:'Lakshmi Rao',    complaints:2, score:51, ltv:175000, status:'watch',    trend:[40,38,35,30,25,20,15] },
  { id:'CLS6', name:'Vikram Singh',   complaints:2, score:62, ltv:130000, status:'stable',   trend:[60,58,55,53,50,48,45] },
];

module.exports = { complaints, genomeClusters, radarAlerts, rbiItems, clsData };
