const pptxgen = require("pptxgenjs");
let pres = new pptxgen();

pres.layout = "LAYOUT_16x9";

// ---------------------------------------------------------
// REUSABLE ENGINEERING HUD THEME (WITH ELEMENT ANIMATIONS)
// ---------------------------------------------------------
function createSlide(title, subtitle, slideNum) {
    let slide = pres.addSlide();
    
    // Slide Transition for when you click "Next Slide"
    slide.transition = { type: "fade", speed: "med" };
    
    slide.background = { fill: "F8FAFC" }; 

    // TECH HUD: Top Border & Left Accent
    slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.05, fill: "0E7490", animate: { type: "fade" } });
    slide.addShape(pres.ShapeType.rect, { x: 0, y: 0.05, w: 0.1, h: "100%", fill: "0E7490", animate: { type: "fade" } });

    // TECH HUD: Floating Data Points
    slide.addText("SYS.MONITOR // ACTIVE", { x: 0.3, y: 0.15, w: 3, h: 0.2, fontSize: 8, color: "94A3B8", bold: true });
    slide.addText(`MODULE_${slideNum} // LIVE`, { x: 8.5, y: 0.15, w: 1, h: 0.2, fontSize: 8, color: "94A3B8", align: "right", bold: true });
    
    // TECH HUD: Bottom UI Line
    slide.addShape(pres.ShapeType.line, { x: 0.3, y: 5.4, w: 9.4, h: 0, line: { color: "E2E8F0", width: 1 } });
    slide.addText("MARINE HVAC DIGITAL TWIN v1.0", { x: 0.3, y: 5.45, w: 4, h: 0.15, fontSize: 7, color: "CBD5E1" });

    // Watermark
    slide.addText("HVAC.TWIN", { x: 5.5, y: 4.5, w: 4.5, h: 1, fontSize: 54, color: "F1F5F9", bold: true, align: "right" });

    // Title & Subtitle Formatting (Animated to Fly In)
    slide.addText(title, { x: 0.4, y: 0.4, w: 8, h: 0.5, fontSize: 28, bold: true, color: "0F172A", animate: { type: "fly" } });
    if (subtitle) {
        slide.addShape(pres.ShapeType.rect, { x: 0.4, y: 0.95, w: 0.05, h: 0.25, fill: "DC2626", animate: { type: "fade" } });
        slide.addText(subtitle, { x: 0.5, y: 0.9, w: 8, h: 0.35, fontSize: 14, bold: true, color: "0E7490", charSpacing: 2, animate: { type: "fade" } });
    }
    
    return slide;
}

// ---------------------------------------------------------
// SLIDE 1: TITLE SLIDE
// ---------------------------------------------------------
let slide1 = pres.addSlide();
slide1.transition = { type: "fade", speed: "med" };
slide1.background = { fill: "FFFFFF" };

// Background Geometric Flare
slide1.addShape(pres.ShapeType.rtTriangle, { x: 5, y: 0, w: 5, h: 5.625, fill: "F1F5F9", flipH: true });
slide1.addShape(pres.ShapeType.rtTriangle, { x: 5.2, y: 0, w: 4.8, h: 5.625, fill: "E2E8F0", flipH: true });

// Main Title Block (Animated Fly In)
slide1.addShape(pres.ShapeType.rect, { x: 0.4, y: 0.8, w: 7, h: 2, fill: "0F172A", shadow: { type: "outer", color: "000000", opacity: 0.3, blur: 10 }, animate: { type: "fly" } });
slide1.addText("MARINE HVAC\nDIGITAL TWIN", { x: 0.6, y: 0.9, w: 6.6, h: 1.4, fontSize: 44, bold: true, color: "FFFFFF", animate: { type: "fly" } });
slide1.addText("Activity-Based Learning & Incident Simulation", { x: 0.6, y: 2.2, w: 6.6, h: 0.4, fontSize: 16, color: "22D3EE", bold: true, charSpacing: 1, animate: { type: "fade" } });

// Presenter Block
slide1.addShape(pres.ShapeType.line, { x: 0.4, y: 3.2, w: 4, h: 0, line: { color: "CBD5E1", width: 1 }, animate: { type: "fade" } });
slide1.addText("PRESENTED BY:", { x: 0.4, y: 3.3, w: 4, h: 0.3, fontSize: 10, bold: true, color: "94A3B8", charSpacing: 1, animate: { type: "fade" } });
slide1.addText("Cyril Dheeran (2303608023)\nMohammed Dhafiq (2303608039)\nM Athul Dev (2303608037)\nAfsal Rahman J (2303608008)", { x: 0.4, y: 3.6, w: 4, h: 1, fontSize: 12, color: "334155", lineSpacing: 20, animate: { type: "fade" } });

// Web App Hyperlink Button
slide1.addShape(pres.ShapeType.roundRect, { x: 0.4, y: 4.8, w: 4.5, h: 0.5, fill: "0E7490", rectRadius: 0.1, shadow: { type: "outer", color: "0E7490", opacity: 0.4, blur: 5 }, animate: { type: "fade" } });
slide1.addText("LAUNCH LIVE APPLICATION ↗", { x: 0.4, y: 4.8, w: 4.5, h: 0.5, fontSize: 12, bold: true, color: "FFFFFF", align: "center", valign: "middle", hyperlink: { url: "https://marine-hvac-sim.vercel.app/" }, animate: { type: "fade" } });

// ---------------------------------------------------------
// HELPER FOR TWO-TONE ANIMATED BULLET POINTS
// ---------------------------------------------------------
function createTechBullet(slide, yPos, prefix, content, isAlert = false) {
    slide.addShape(pres.ShapeType.rect, { x: 0.4, y: yPos + 0.05, w: 0.08, h: 0.08, fill: isAlert ? "DC2626" : "0E7490", animate: { type: "fade" } });
    slide.addText([
        { text: prefix + ": ", options: { bold: true, color: isAlert ? "DC2626" : "0E7490" } },
        { text: content, options: { color: "334155" } }
    ], { x: 0.6, y: yPos, w: 8.5, h: 0.5, fontSize: 16, valign: "top", animate: { type: "fade" } });
}

// ---------------------------------------------------------
// INCIDENT 1: REGINA SEAWAYS
// ---------------------------------------------------------
let s2 = createSlide("CASE STUDY 1: REGINA SEAWAYS", "INCIDENT OVERVIEW & VESSEL PROFILE", "01A");
createTechBullet(s2, 1.6, "Vessel Classification", "DFDS Regina Seaways (Commercial Ro-Ro Passenger Ferry).");
createTechBullet(s2, 2.3, "Incident Environment", "Underway in the Baltic Sea, en route to Klaipeda, Lithuania (October 2018).");
createTechBullet(s2, 3.0, "Initial Trigger", "Excessive block vibration detected, culminating in a catastrophic mechanical breakdown of the starboard main engine.");
createTechBullet(s2, 3.8, "Primary Hazard", "Internal engine components structurally breached the crankcase, instantly igniting an uncontained engine room fire.", true);

let s3 = createSlide("CASE STUDY 1: REGINA SEAWAYS", "TECHNICAL HVAC FLAW & CASCADING FAILURE", "01B");
createTechBullet(s3, 1.6, "Structural Design Flaw", "Port and starboard engine compartments shared interconnected ambient ventilation ducting.", true);
createTechBullet(s3, 2.3, "Missing Safeties", "The shared duct lacked automatic, heat-triggered fire isolation dampers.");
createTechBullet(s3, 3.0, "Cross-Contamination", "The running port engine created negative pressure, pulling toxic smoke from the starboard fire directly into its own air intakes.");
createTechBullet(s3, 3.8, "Ultimate Consequence", "The port engine aspirated particulate matter, choked, and stalled. The vessel suffered a total blackout and loss of propulsion.", true);

let s4 = createSlide("REAL-WORLD AFTERMATH: REGINA SEAWAYS", "ACTUAL INCIDENT PHOTO", "01C");
s4.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.5, w: 9.2, h: 3.5, fill: "E2E8F0", line: { type: "dash", color: "94A3B8", width: 2 }, animate: { type: "fade" } });
s4.addText("INSERT ACTUAL INCIDENT PHOTO HERE\n(Real-world picture of the vessel or aftermath)", { x: 0.4, y: 1.5, w: 9.2, h: 3.5, fontSize: 16, color: "64748B", align: "center", valign: "middle", bold: true, animate: { type: "fade" } });

let s5 = createSlide("SIMULATION: REGINA SEAWAYS", "CRITICAL DECISION REQUIRED", "01D");
s5.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.5, w: 9.2, h: 3.5, fill: "E2E8F0", line: { type: "dash", color: "94A3B8", width: 2 }, animate: { type: "fade" } });
s5.addText("INSERT DIGITAL TWIN SCREENSHOT HERE\n(Action: Manually Close Isolation Dampers)", { x: 0.4, y: 1.5, w: 9.2, h: 3.5, fontSize: 16, color: "64748B", align: "center", valign: "middle", bold: true, animate: { type: "fade" } });

// ---------------------------------------------------------
// INCIDENT 2: F/V KALTAN
// ---------------------------------------------------------
let s6 = createSlide("CASE STUDY 2: F/V KALTAN", "INCIDENT OVERVIEW & VESSEL PROFILE", "02A");
createTechBullet(s6, 1.6, "Vessel Classification", "Commercial Fishing Trawler.");
createTechBullet(s6, 2.3, "Incident Environment", "Docked for out-of-service repairs at Gamcheon Port, Busan, South Korea (September 15, 2026).");
createTechBullet(s6, 3.0, "Initial Trigger", "A compromised mechanical seal failed entirely on the main Freon refrigeration compressor during routine maintenance.");
createTechBullet(s6, 3.8, "Primary Hazard", "High-pressure Freon coolant evacuated from the system rapidly, triggering pressure drop alarms on the bridge.", true);

let s7 = createSlide("CASE STUDY 2: F/V KALTAN", "GAS PHYSICS & CONFINED SPACE HAZARD", "02B");
createTechBullet(s7, 1.6, "Fluid Dynamics of Freon", "Refrigerant gases like Freon are significantly heavier than ambient air.");
createTechBullet(s7, 2.3, "The Invisible Trap", "Rather than dissipating, the toxic gas behaved like a fluid, flowing down deck stairs and displacing lighter oxygen.");
createTechBullet(s7, 3.0, "Accumulation Zone", "The gas pooled in the lowest point of the vessel—the unventilated lower fish hold.", true);
createTechBullet(s7, 3.8, "Fatal Human Error", "Crewmen breached protocol by entering the confined space to inspect the leak without SCBA gear, resulting in rapid asphyxiation.", true);

let s8 = createSlide("REAL-WORLD AFTERMATH: F/V KALTAN", "ACTUAL INCIDENT PHOTO", "02C");
s8.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.5, w: 9.2, h: 3.5, fill: "E2E8F0", line: { type: "dash", color: "94A3B8", width: 2 }, animate: { type: "fade" } });
s8.addText("INSERT ACTUAL INCIDENT PHOTO HERE\n(Real-world picture of the vessel or aftermath)", { x: 0.4, y: 1.5, w: 9.2, h: 3.5, fontSize: 16, color: "64748B", align: "center", valign: "middle", bold: true, animate: { type: "fade" } });

let s9 = createSlide("SIMULATION: F/V KALTAN", "CRITICAL DECISION REQUIRED", "02D");
s9.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.5, w: 9.2, h: 3.5, fill: "E2E8F0", line: { type: "dash", color: "94A3B8", width: 2 }, animate: { type: "fade" } });
s9.addText("INSERT DIGITAL TWIN SCREENSHOT HERE\n(Action: Require SCBA Gear Before Entry)", { x: 0.4, y: 1.5, w: 9.2, h: 3.5, fontSize: 16, color: "64748B", align: "center", valign: "middle", bold: true, animate: { type: "fade" } });

// ---------------------------------------------------------
// INCIDENT 3: INS RANVIR
// ---------------------------------------------------------
let s10 = createSlide("CASE STUDY 3: INS RANVIR", "INCIDENT OVERVIEW & VESSEL PROFILE", "03A");
createTechBullet(s10, 1.6, "Vessel Classification", "Rajput-class guided-missile destroyer, Indian Navy.");
createTechBullet(s10, 2.3, "Incident Environment", "Naval Dockyard, Mumbai, India (January 2022).");
createTechBullet(s10, 3.0, "Operation", "Shore contractors boarded the vessel for routine maintenance and topping up of the forward AC plant's R-22 refrigerant.");
createTechBullet(s10, 3.8, "Primary Hazard", "A massive supply chain error. Contractors unknowingly attached a cylinder containing R-152a—a highly flammable hydrocarbon gas.", true);

let s11 = createSlide("CASE STUDY 3: INS RANVIR", "THERMOBARIC EXPLOSION MECHANISM", "03B");
createTechBullet(s11, 1.6, "System Mismatch", "Pumping R-152a into an R-22 system caused immediate pressure imbalances, blowing the compressor casing seal.");
createTechBullet(s11, 2.3, "Gas Accumulation", "The forward machinery room rapidly filled with the unventilated, combustible hydrocarbon vapor.", true);
createTechBullet(s11, 3.0, "Ignition Source", "The pooling gas reached a nearby electrical panel just as an automatic contactor relay tripped, generating a high-voltage spark.");
createTechBullet(s11, 3.8, "Ultimate Consequence", "The spark ignited the hydrocarbon gas, causing a devastating thermobaric explosion and hull breach.", true);

let s12 = createSlide("REAL-WORLD AFTERMATH: INS RANVIR", "ACTUAL INCIDENT PHOTO", "03C");
s12.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.5, w: 9.2, h: 3.5, fill: "E2E8F0", line: { type: "dash", color: "94A3B8", width: 2 }, animate: { type: "fade" } });
s12.addText("INSERT ACTUAL INCIDENT PHOTO HERE\n(Real-world picture of the vessel or aftermath)", { x: 0.4, y: 1.5, w: 9.2, h: 3.5, fontSize: 16, color: "64748B", align: "center", valign: "middle", bold: true, animate: { type: "fade" } });

let s13 = createSlide("SIMULATION: INS RANVIR", "CRITICAL DECISION REQUIRED", "03D");
s13.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.5, w: 9.2, h: 3.5, fill: "E2E8F0", line: { type: "dash", color: "94A3B8", width: 2 }, animate: { type: "fade" } });
s13.addText("INSERT DIGITAL TWIN SCREENSHOT HERE\n(Action: Emergency Halt - Flammable R-152a Detected)", { x: 0.4, y: 1.5, w: 9.2, h: 3.5, fontSize: 16, color: "64748B", align: "center", valign: "middle", bold: true, animate: { type: "fade" } });

// ---------------------------------------------------------
// INCIDENT 4: AL-SALAM BOCCACCIO 98
// ---------------------------------------------------------
let s14 = createSlide("CASE STUDY 4: AL-SALAM BOCCACCIO 98", "INCIDENT OVERVIEW & VESSEL PROFILE", "04A");
createTechBullet(s14, 1.6, "Vessel Classification", "Heavy Egyptian Ro-Ro (Roll-on/Roll-off) Passenger Ferry.");
createTechBullet(s14, 2.3, "Incident Environment", "Open waters in the Red Sea, sailing from Duba to Safaga (February 2006).");
createTechBullet(s14, 3.0, "Initial Trigger", "A localized fire sparked in the lower vehicle deck, suspected to have originated in a parked cargo vehicle.");
createTechBullet(s14, 3.8, "Primary Hazard", "Smoke alarms triggered on the bridge, and crew members began firefighting operations using high-volume seawater hoses.", true);

let s15 = createSlide("CASE STUDY 4: AL-SALAM BOCCACCIO 98", "VENTILATION ERROR & FREE SURFACE EFFECT", "04B");
createTechBullet(s15, 1.6, "HVAC Operational Error", "Crew failed to shut down the massive forced-draft supply and exhaust ventilation fans on the vehicle deck.", true);
createTechBullet(s15, 2.3, "Fire Dynamics", "The continuous flow of fresh oxygen acted as a massive bellows, expanding the localized fire uncontrollably.");
createTechBullet(s15, 3.0, "Drainage Failure", "To fight the massive fire, tons of seawater were pumped in, but blocked deck scuppers trapped the water onboard.");
createTechBullet(s15, 3.8, "Ultimate Consequence", "The trapped water sloshed across the deck (Free Surface Effect), destabilizing the center of gravity and capsizing the ferry.", true);

let s16 = createSlide("REAL-WORLD AFTERMATH: AL-SALAM BOCCACCIO 98", "ACTUAL INCIDENT PHOTO", "04C");
s16.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.5, w: 9.2, h: 3.5, fill: "E2E8F0", line: { type: "dash", color: "94A3B8", width: 2 }, animate: { type: "fade" } });
s16.addText("INSERT ACTUAL INCIDENT PHOTO HERE\n(Real-world picture of the vessel or aftermath)", { x: 0.4, y: 1.5, w: 9.2, h: 3.5, fontSize: 16, color: "64748B", align: "center", valign: "middle", bold: true, animate: { type: "fade" } });

let s17 = createSlide("SIMULATION: AL-SALAM BOCCACCIO 98", "CRITICAL DECISION REQUIRED", "04D");
s17.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.5, w: 9.2, h: 3.5, fill: "E2E8F0", line: { type: "dash", color: "94A3B8", width: 2 }, animate: { type: "fade" } });
s17.addText("INSERT DIGITAL TWIN SCREENSHOT HERE\n(Action: Emergency Stop Ventilation Fans)", { x: 0.4, y: 1.5, w: 9.2, h: 3.5, fontSize: 16, color: "64748B", align: "center", valign: "middle", bold: true, animate: { type: "fade" } });

// ---------------------------------------------------------
// LIVE SIMULATOR LOGIC & ARCHITECTURE
// ---------------------------------------------------------
let s18 = createSlide("DIGITAL TWIN ARCHITECTURE", "HOW THE LIVE SIMULATOR WORKS", "05A");

// Box 1: Input (Cyan)
s18.addShape(pres.ShapeType.roundRect, { x: 0.4, y: 1.6, w: 2.6, h: 1.4, fill: "0E7490", rectRadius: 0.1, shadow: { type: "outer", color: "0E7490", opacity: 0.4, blur: 5 }, animate: { type: "fly", direction: "left" } });
s18.addText("1. USER INPUTS\nReact State Variables\n(Ambient Temp, Sea Temp, Valve %, Compressor Load)", { x: 0.4, y: 1.6, w: 2.6, h: 1.4, fontSize: 12, color: "FFFFFF", align: "center", bold: true, animate: { type: "fly", direction: "left" } });
s18.addShape(pres.ShapeType.rightArrow, { x: 3.1, y: 2.05, w: 0.5, h: 0.5, fill: "94A3B8", animate: { type: "fade" } });

// Box 2: Logic Engine (Navy)
s18.addShape(pres.ShapeType.roundRect, { x: 3.7, y: 1.6, w: 3.2, h: 1.4, fill: "0F172A", rectRadius: 0.1, shadow: { type: "outer", color: "000000", opacity: 0.3, blur: 5 }, animate: { type: "fly", direction: "left" } });
s18.addText("2. THERMODYNAMIC ENGINE\nCalculates real-time Condenser Pressures, Cooling Effects, and Humidity Deltas based on physical limits.", { x: 3.7, y: 1.6, w: 3.2, h: 1.4, fontSize: 12, color: "FFFFFF", align: "center", bold: true, animate: { type: "fly", direction: "left" } });
s18.addShape(pres.ShapeType.rightArrow, { x: 7.0, y: 2.05, w: 0.5, h: 0.5, fill: "94A3B8", animate: { type: "fade" } });

// Box 3: Output Render (Red)
s18.addShape(pres.ShapeType.roundRect, { x: 7.6, y: 1.6, w: 2.0, h: 1.4, fill: "DC2626", rectRadius: 0.1, shadow: { type: "outer", color: "DC2626", opacity: 0.4, blur: 5 }, animate: { type: "fly", direction: "left" } });
s18.addText("3. UI RENDER\nUpdates UI SVGs,\nTriggers Logic Alarms", { x: 7.6, y: 1.6, w: 2.0, h: 1.4, fontSize: 12, color: "FFFFFF", align: "center", bold: true, animate: { type: "fly", direction: "left" } });

// Code snippet box below
s18.addShape(pres.ShapeType.rect, { x: 0.4, y: 3.3, w: 9.2, h: 1.5, fill: "F1F5F9", line: { color: "CBD5E1", width: 1 }, animate: { type: "fade" } });
s18.addShape(pres.ShapeType.rect, { x: 0.4, y: 3.3, w: 0.1, h: 1.5, fill: "0E7490", animate: { type: "fade" } });
s18.addText("// Live Logic Snippet\nconst condenserPress = Math.max(4.0, 10 + ((seaTemp - 20) * 0.8) + (activeLoad * 0.05));\nconst coolingEffect = isTripped ? 0 : (coolerValve / 100) * maxCoolingDelta;\nconst cabinHumidity = 40 + (humidifierValve / 100 * 40) - (coolerValve / 100 * 15);", 
    { x: 0.6, y: 3.3, w: 9, h: 1.5, fontSize: 12, color: "334155", align: "left", valign: "middle", fontFace: "Courier New", bold: true, animate: { type: "fade" } }
);

// ---------------------------------------------------------
// NEW SIMULATOR SLIDES
// ---------------------------------------------------------
let s19 = createSlide("SYSTEM SIMULATOR: REFRIGERATION PLANT", "PROVISION REFRIGERATION MONITORING", "06A");
s19.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.5, w: 9.2, h: 3.5, fill: "E2E8F0", line: { type: "dash", color: "94A3B8", width: 2 }, animate: { type: "fade" } });
s19.addText("INSERT SCREENSHOT\n(Simulator Tab: Refrigeration Plant showing Meat/Veg Rooms)", { x: 0.4, y: 1.5, w: 9.2, h: 3.5, fontSize: 16, color: "64748B", align: "center", valign: "middle", bold: true, animate: { type: "fade" } });

let s20 = createSlide("SYSTEM SIMULATOR: AIR HANDLING UNIT", "AC AIR HANDLING UNIT (AHU) CONTROLS", "06B");
s20.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.5, w: 9.2, h: 3.5, fill: "E2E8F0", line: { type: "dash", color: "94A3B8", width: 2 }, animate: { type: "fade" } });
s20.addText("INSERT SCREENSHOT\n(Simulator Tab: AHU View showing Cabin Temp and Humidity)", { x: 0.4, y: 1.5, w: 9.2, h: 3.5, fontSize: 16, color: "64748B", align: "center", valign: "middle", bold: true, animate: { type: "fade" } });

let s21 = createSlide("SYSTEM SCHEMATIC & PIPING DIAGRAM", "HVAC LINE DIAGRAM", "06C");
s21.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.5, w: 9.2, h: 3.5, fill: "E2E8F0", line: { type: "dash", color: "94A3B8", width: 2 }, animate: { type: "fade" } });
s21.addText("INSERT SCHEMATIC IMAGE\n(Paste an actual line diagram or piping schematic here)", { x: 0.4, y: 1.5, w: 9.2, h: 3.5, fontSize: 16, color: "64748B", align: "center", valign: "middle", bold: true, animate: { type: "fade" } });

// ---------------------------------------------------------
// GENERATE FILE
// ---------------------------------------------------------
pres.writeFile({ fileName: "Marine_HVAC_Digital_Twin_Presentation.pptx" })
  .then(() => console.log("Presentation generated successfully!"));