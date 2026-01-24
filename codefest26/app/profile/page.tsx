'use client';
import { useEffect } from 'react';
import ProfileCard from '@/components/ProfileCard';

import akshatImg from '@/public/images/akshat_core.png';
import adithyaImg from '@/public/images/adithya_core.png';
import soumyajitImg from '@/public/images/soumyajit_core.png';
import niaImg from '@/public/images/nia_core.png';
import ritayushImg from '@/public/images/ritayush_core.png';
import aryanImg from '@/public/images/aryan_tech.png';
import maanImg from '@/public/images/maan_tech.png';
import sreshtImg from '@/public/images/sresht_tech.png';
import pratyushImg from '@/public/images/pratyush_tech.png';
import subanImg from '@/public/images/suban_finance.png';
import ryanImg from '@/public/images/ryan_finance.png';
import anainahImg from '@/public/images/anainah_logistics.png';
import aryanvImg from '@/public/images/aryan_logistics.png';
import iniyaImg from '@/public/images/iniya_logistics.png';
import kennethImg from '@/public/images/kenneth_logistics.png';
import priyankaImg from '@/public/images/priyanka_logistics.png';
import siyaImg from '@/public/images/siya_logistics.png';
import rainaImg from '@/public/images/raina_marketing.png';
import mokshapImg from '@/public/images/mokshap_marketing.png';
import sathyaImg from '@/public/images/sathya_marketing.png';
import kyraImg from '@/public/images/kyra_marketing.png';
import imonImg from '@/public/images/imon_marketing.png';
import iconPattern from '@/public/images/iconpattern.png';
import grainImg from '@/public/images/grain.webp';
import { a } from 'motion/react-client';
import "../../../Common/styles.css";

export default function ProfilePage() {
  useEffect(() => {
    // Function to send height to parent
    const sendHeight = () => {
      const bottomMarker = document.querySelector('.iframe-bottom-marker');
      if (bottomMarker && window.parent) {
        const rect = bottomMarker.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const height = rect.top + scrollTop;
        
        // Send height to parent window
        window.parent.postMessage({ 
          type: 'iframeHeight', 
          height: height 
        }, '*');
      }
    };

    // Send height initially
    sendHeight();

    // Send height when images load
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.complete) {
        sendHeight();
      } else {
        img.addEventListener('load', sendHeight);
      }
    });

    // Send height on window resize
    window.addEventListener('resize', sendHeight);

    // Use MutationObserver to detect DOM changes
    const observer = new MutationObserver(sendHeight);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', sendHeight);
      observer.disconnect();
      images.forEach(img => {
        img.removeEventListener('load', sendHeight);
      });
    };
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: 'transparent',
      padding: '0rem',
      gap: '1.5rem',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
        <style>{`.event-note {
    position: relative;
    max-width: 900px;
    margin: 48px auto 0 auto;
    display: flex;
    background-color: var(--sec-bg);
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 18px 36px rgba(0, 0, 0, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.06);
}

.note-accent {
    width: 8px;
    background-color: var(--sec-accent-color);
}

.note-content {
    padding: 26px 32px;
    color: var(--text-color);
}

/* Header label */
.note-header {
    display: inline-block;
    padding: 6px 14px;
    margin-bottom: 14px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--bg-color);
    background-color: var(--sec-accent-color);
    border-radius: 999px;
}

.note-content p {
    margin: 0;
    font-size: 15px;
    line-height: 1.6;
    color: var(--cl-color);
}

.note-content strong {
    color: var(--sec-accent-color);
}`}</style>
      
      {/* Row 1: Core Team */}

      <div className="event-note">
            <div className="note-content">
                <div>
                    <div className="note-header">Core Team</div>
                    <p>
                        The core team is responsible for overseeing all other teems and ensuring inter-team communication and coordination.
                    </p>
                </div>
            </div>

            <div className=" note-accent"></div>
        </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <ProfileCard
                name="Akshat Shanker Gupta"
                title="Core Team"
                handle="akshat"
                status="Online"
                contactText="Contact Me"
                avatarUrl={akshatImg.src}
                iconUrl={iconPattern.src}
                grainUrl={grainImg.src}
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact clicked')}
                behindGlowEnabled={true}
                behindGlowColor="hsla(347, 100%, 70%, 0.6)"
                innerGradient="linear-gradient(145deg,hsla(347, 40%, 45%, 0.55) 0%,hsla(203, 60%, 70%, 0.27) 100%)" 
                behindGlowSize={undefined} 
                miniAvatarUrl={undefined}
        />
        <ProfileCard
                name="Adithya Bangolae"
                title="Core Team"
                handle="adithya"
                status="Online"
                contactText="Contact Me"
                avatarUrl={adithyaImg.src}
                iconUrl={iconPattern.src}
                grainUrl={grainImg.src}
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact clicked')}
                behindGlowEnabled={true}
                behindGlowColor="hsla(347, 100%, 70%, 0.6)"
                innerGradient="linear-gradient(145deg,hsla(347, 40%, 45%, 0.55) 0%,hsla(203, 60%, 70%, 0.27) 100%)" 
                behindGlowSize={undefined} 
                miniAvatarUrl={undefined}
        />
        <ProfileCard
                name="Soumyajit Sur Roy"
                title="Core Team"
                handle="soumyajit"
                status="Online"
                contactText="Contact Me"
                avatarUrl={soumyajitImg.src}
                iconUrl={iconPattern.src}
                grainUrl={grainImg.src}
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact clicked')}
                behindGlowEnabled={true}
                behindGlowColor="hsla(347, 100%, 70%, 0.6)"
                innerGradient="linear-gradient(145deg,hsla(347, 40%, 45%, 0.55) 0%,hsla(203, 60%, 70%, 0.27) 100%)" 
                behindGlowSize={undefined} 
                miniAvatarUrl={undefined}
        />
        <ProfileCard
                name="Nia Esturi"
                title="Core Team"
                handle="nia"
                status="Online"
                contactText="Contact Me"
                avatarUrl={niaImg.src}
                iconUrl={iconPattern.src}
                grainUrl={grainImg.src}
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact clicked')}
                behindGlowEnabled={true}
                behindGlowColor="hsla(347, 100%, 70%, 0.6)"
                innerGradient="linear-gradient(145deg,hsla(347, 40%, 45%, 0.55) 0%,hsla(203, 60%, 70%, 0.27) 100%)" 
                behindGlowSize={undefined} 
                miniAvatarUrl={undefined}
                avatarStyle={{ top: 'unset', bottom: '-50px', transform: 'translateX(-50%)', width: '90%' }}
        />
        <ProfileCard
                name="Ritayush Dey"
                title="Core Team"
                handle="ritayush"
                status="Online"
                contactText="Contact Me"
                avatarUrl={ritayushImg.src}
                iconUrl={iconPattern.src}
                grainUrl={grainImg.src}
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact clicked')}
                behindGlowEnabled={true}
                behindGlowColor="hsla(347, 100%, 70%, 0.6)"
                innerGradient="linear-gradient(145deg,hsla(347, 40%, 45%, 0.55) 0%,hsla(203, 60%, 70%, 0.27) 100%)" 
                behindGlowSize={undefined} 
                miniAvatarUrl={undefined}
                avatarStyle={{ top: 'unset', bottom: '-115px', transform: 'translateX(-50%)', width: '80%' }}
        />
      </div>

      {/* Row 2: Tech Team */}
        <div className="event-note">
            <div className="note-content">
                <div>
                    <div className="note-header">Technology Team</div>
                    <p>
                        The technology team is responsible for aspects such as the website, team dashboard, some parts of auditing and mini-challenges, and more, acting to make sure the event remains engaging and smooth.
                    </p>
                </div>
            </div>

            <div className=" note-accent"></div>
        </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <br></br>
        <ProfileCard
                name="Aryan Krishnan"
                title="Technology Head"
                handle="aryan"
                status="Online"
                contactText="Contact Me"
                avatarUrl={aryanImg.src}
                iconUrl={iconPattern.src}
                grainUrl={grainImg.src}
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact clicked')}
                behindGlowEnabled={true}
                behindGlowColor="hsla(192, 100%, 70%, 0.60)"
                innerGradient="linear-gradient(145deg,hsla(191, 40%, 45%, 0.55) 0%,hsla(205, 60%, 70%, 0.27) 100%)" 
                behindGlowSize={undefined} 
                miniAvatarUrl={undefined}
                avatarStyle={{ top: 'unset', bottom: '0px', transform: 'translateX(-50%)', width: '130%' }}
        />
        <ProfileCard
                name="Maan Biswas"
                title="Technology Team"
                handle="maan"
                status="Online"
                contactText="Contact Me"
                avatarUrl={maanImg.src}
                iconUrl={iconPattern.src}
                grainUrl={grainImg.src}
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact clicked')}
                behindGlowEnabled={true}
                behindGlowColor="hsla(192, 100%, 70%, 0.60)"
                innerGradient="linear-gradient(145deg,hsla(191, 40%, 45%, 0.55) 0%,hsla(205, 60%, 70%, 0.27) 100%)" 
                behindGlowSize={undefined} 
                miniAvatarUrl={undefined}
                avatarStyle={{ top: 'unset', bottom: '0px', transform: 'translateX(-50%)', width: '120%' }}
        />
        <ProfileCard
                name="Sresht Thiyagashankar"
                title="Technology Team"
                handle="sresht"
                status="Online"
                contactText="Contact Me"
                avatarUrl={sreshtImg.src}
                iconUrl={iconPattern.src}
                grainUrl={grainImg.src}
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact clicked')}
                behindGlowEnabled={true}
                behindGlowColor="hsla(192, 100%, 70%, 0.60)"
                innerGradient="linear-gradient(145deg,hsla(191, 40%, 45%, 0.55) 0%,hsla(205, 60%, 70%, 0.27) 100%)" 
                behindGlowSize={undefined} 
                miniAvatarUrl={undefined}
                avatarStyle={{ top: 'unset', bottom: '0px', transform: 'translateX(-68%)', width: '120%' }}
        />
        <ProfileCard
                name="Pratyush Vel Shankar"
                title="Technology Team"
                handle="pratyush"
                status="Online"
                contactText="Contact Me"
                avatarUrl={pratyushImg.src}
                iconUrl={iconPattern.src}
                grainUrl={grainImg.src}
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact clicked')}
                behindGlowEnabled={true}
                behindGlowColor="hsla(192, 100%, 70%, 0.60)"
                innerGradient="linear-gradient(145deg,hsla(191, 40%, 45%, 0.55) 0%,hsla(205, 60%, 70%, 0.27) 100%)" 
                behindGlowSize={undefined} 
                miniAvatarUrl={undefined}
                avatarStyle={{ top: 'unset', bottom: '-100px', transform: 'translateX(-50%)', width: '90%' }}
        />
      </div>
      {/* Row 3: Finance Team */}
        <div className="event-note">
            <div className="note-content">
                <div>
                    <div className="note-header">Finance Team</div>
                    <p>
                        The finance team is responsible for managing the budget and finances of the event, ensuring that all expenses are within the allocated budget and that all financial transactions are transparent and accountable.
                    </p>
                </div>
            </div>

            <div className=" note-accent"></div>
        </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <ProfileCard
                name="Suban Sudhakar"
                title="Finance Head"
                handle="suban"
                status="Online"
                contactText="Contact Me"
                avatarUrl={subanImg.src}
                iconUrl={iconPattern.src}
                grainUrl={grainImg.src}
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact clicked')}
                behindGlowEnabled={true}
                behindGlowColor="hsla(146, 100%, 70%, 0.60)"
                innerGradient="linear-gradient(145deg,hsla(161, 40%, 45%, 0.55) 0%,hsla(76, 60%, 70%, 0.27) 100%)" 
                behindGlowSize={undefined} 
                miniAvatarUrl={undefined}
                avatarStyle={{ top: 'unset', bottom: '-50px', transform: 'translateX(-50%)', width: '90%' }}
        />
        <ProfileCard
                name="Ryan Dennis Gomez"
                title="Finance Head"
                handle="ryan"
                status="Online"
                contactText="Contact Me"
                avatarUrl={ryanImg.src}
                iconUrl={iconPattern.src}
                grainUrl={grainImg.src}
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact clicked')}
                behindGlowEnabled={true}
                behindGlowColor="hsla(146, 100%, 70%, 0.60)"
                innerGradient="linear-gradient(145deg,hsla(161, 40%, 45%, 0.55) 0%,hsla(76, 60%, 70%, 0.27) 100%)" 
                behindGlowSize={undefined} 
                miniAvatarUrl={undefined}
                avatarStyle={{ top: 'unset', bottom: '-50px', transform: 'translateX(-50%)', width: '75%' }}
        />
      </div>
      <div className="event-note">
            <div className="note-content">
                <div>
                    <div className="note-header">Logistics Team</div>
                    <p>
                        The logistics team is responsible for managing the logistics of the event, such as tables, seating, mini-challenges, and more, ensuring that all aspects of the event run smoothly and efficiently.
                    </p>
                </div>
            </div>

            <div className=" note-accent"></div>
        </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <ProfileCard
                name="Aryan Vanam"
                title="Logistics Head"
                handle="aryanv"
                status="Online"
                contactText="Contact Me"
                avatarUrl={aryanvImg.src}
                iconUrl={iconPattern.src}
                grainUrl={grainImg.src}
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact clicked')}
                behindGlowEnabled={true}
                behindGlowColor="hsla(280, 100%, 70%, 0.60)"
                innerGradient="linear-gradient(145deg,hsla(280, 40%, 45%, 0.55) 0%,hsla(260, 60%, 70%, 0.27) 100%)" 
                behindGlowSize={undefined} 
                miniAvatarUrl={undefined}
                avatarStyle={{ top: 'unset', bottom: '-120px', transform: 'translateX(-50%)', width: '80%' }}
        />
        <ProfileCard
                name="Iniya Gopalakrishnan"
                title="Logistics Head"
                handle="iniya"
                status="Online"
                contactText="Contact Me"
                avatarUrl={iniyaImg.src}
                iconUrl={iconPattern.src}
                grainUrl={grainImg.src}
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact clicked')}
                behindGlowEnabled={true}
                behindGlowColor="hsla(280, 100%, 70%, 0.60)"
                innerGradient="linear-gradient(145deg,hsla(280, 40%, 45%, 0.55) 0%,hsla(260, 60%, 70%, 0.27) 100%)" 
                behindGlowSize={undefined} 
                miniAvatarUrl={undefined}
                avatarStyle={{ top: 'unset', bottom: '-50px', transform: 'translateX(-50%)', width: '120%' }}
        />
        <ProfileCard
                name="Anainah Nahas"
                title="Logistics Team"
                handle="anainah"
                status="Online"
                contactText="Contact Me"
                avatarUrl={anainahImg.src}
                iconUrl={iconPattern.src}
                grainUrl={grainImg.src}
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact clicked')}
                behindGlowEnabled={true}
                behindGlowColor="hsla(280, 100%, 70%, 0.60)"
                innerGradient="linear-gradient(145deg,hsla(280, 40%, 45%, 0.55) 0%,hsla(260, 60%, 70%, 0.27) 100%)" 
                behindGlowSize={undefined} 
                miniAvatarUrl={undefined}
                avatarStyle={{ top: 'unset', bottom: '0px', transform: 'translateX(-60%)', width: '110%' }}
        />
        <ProfileCard
                name="Kenneth Jude Thomas"
                title="Logistics Team"
                handle="kenneth"
                status="Online"
                contactText="Contact Me"
                avatarUrl={kennethImg.src}
                iconUrl={iconPattern.src}
                grainUrl={grainImg.src}
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact clicked')}
                behindGlowEnabled={true}
                behindGlowColor="hsla(280, 100%, 70%, 0.60)"
                innerGradient="linear-gradient(145deg,hsla(280, 40%, 45%, 0.55) 0%,hsla(260, 60%, 70%, 0.27) 100%)" 
                behindGlowSize={undefined} 
                miniAvatarUrl={undefined}
                avatarStyle={{ top: 'unset', bottom: '0px', transform: 'translateX(-50%)', width: '180%' }}
        />
        <ProfileCard

                name="Priyanka Perumal"
                title="Logistics Team"
                handle="priyanka"
                status="Online"
                contactText="Contact Me"
                avatarUrl={priyankaImg.src}
                iconUrl={iconPattern.src}
                grainUrl={grainImg.src}
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact clicked')}
                behindGlowEnabled={true}
                behindGlowColor="hsla(280, 100%, 70%, 0.60)"
                innerGradient="linear-gradient(145deg,hsla(280, 40%, 45%, 0.55) 0%,hsla(260, 60%, 70%, 0.27) 100%)" 
                behindGlowSize={undefined} 
                miniAvatarUrl={undefined}
                avatarStyle={{ top: 'unset', bottom: '0px', transform: 'translateX(-50%)', width: '90%' }}
        />
        <ProfileCard

                name="Siya Ganesh"
                title="Logistics Team"
                handle="siya"
                status="Online"
                contactText="Contact Me"
                avatarUrl={siyaImg.src}
                iconUrl={iconPattern.src}
                grainUrl={grainImg.src}
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact clicked')}
                behindGlowEnabled={true}
                behindGlowColor="hsla(280, 100%, 70%, 0.60)"
                innerGradient="linear-gradient(145deg,hsla(280, 40%, 45%, 0.55) 0%,hsla(260, 60%, 70%, 0.27) 100%)" 
                behindGlowSize={undefined} 
                miniAvatarUrl={undefined}
                avatarStyle={{ top: 'unset', bottom: '0px', transform: 'translateX(-60%)', width: '90%' }}
        />
      </div>

      <div className="event-note">
            <div className="note-content">
                <div>
                    <div className="note-header">Marketting Team</div>
                    <p>
                        The marketing team is responsible for managing the marketing of the event, such as social media, color scheme, and more, ensuring that the event is a success.
                    </p>
                </div>
            </div>

            <div className=" note-accent"></div>
        </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
       <ProfileCard
        name="Raina Shukla"
        title="Marketing Head"
        handle="raina"
        status="Online"
        contactText="Contact Me"
        avatarUrl={rainaImg.src}
        iconUrl={iconPattern.src}
        grainUrl={grainImg.src}
        showUserInfo={false}
        enableTilt={true}
        enableMobileTilt={false}
        onContactClick={() => console.log('Contact clicked')}
        behindGlowEnabled={true}
        innerGradient="linear-gradient(
          145deg,
          hsla(51, 85%, 58%, 0.8) 0%,
          hsla(51, 75%, 48%, 0.55) 45%,
          hsla(51, 65%, 32%, 0.25) 100%
        )"
        behindGlowColor="hsla(51, 80%, 55%, 0.45)"
        behindGlowSize={undefined}
        miniAvatarUrl={undefined}
        avatarStyle={{ top: 'unset', bottom: '0px', transform: 'translateX(-60%)', width: '110%' }}
      />

      <ProfileCard
        name="Mokshatha pokuri"
        title="Marketing Team"
        handle="mokshap"
        status="Online"
        contactText="Contact Me"
        avatarUrl={mokshapImg.src}
        iconUrl={iconPattern.src}
        grainUrl={grainImg.src}
        showUserInfo={false}
        enableTilt={true}
        enableMobileTilt={false}
        onContactClick={() => console.log('Contact clicked')}
        behindGlowEnabled={true}
        innerGradient="linear-gradient(
          145deg,
          hsla(51, 85%, 58%, 0.8) 0%,
          hsla(51, 75%, 48%, 0.55) 45%,
          hsla(51, 65%, 32%, 0.25) 100%
        )"
        behindGlowColor="hsla(51, 80%, 55%, 0.45)"
        behindGlowSize={undefined}
        miniAvatarUrl={undefined}
        avatarStyle={{ top: 'unset', bottom: '-120px', transform: 'translateX(-50%)', width: '80%' }}
      />

      <ProfileCard
        name="Sathya Balusu"
        title="Marketing Team"
        handle="sathya"
        status="Online"
        contactText="Contact Me"
        avatarUrl={sathyaImg.src}
        iconUrl={iconPattern.src}
        grainUrl={grainImg.src}
        showUserInfo={false}
        enableTilt={true}
        enableMobileTilt={false}
        onContactClick={() => console.log('Contact clicked')}
        behindGlowEnabled={true}
        innerGradient="linear-gradient(
          145deg,
          hsla(51, 85%, 58%, 0.8) 0%,
          hsla(51, 75%, 48%, 0.55) 45%,
          hsla(51, 65%, 32%, 0.25) 100%
        )"
        behindGlowColor="hsla(51, 80%, 55%, 0.45)"
        behindGlowSize={undefined}
        miniAvatarUrl={undefined}
        avatarStyle={{ top: 'unset', bottom: '-50px', transform: 'translateX(-50%)', width: '120%' }}
      />

      <br />

      <ProfileCard
        name="Kyra Agarwal"
        title="Marketing Team"
        handle="kyra"
        status="Online"
        contactText="Contact Me"
        avatarUrl={kyraImg.src}
        iconUrl={iconPattern.src}
        grainUrl={grainImg.src}
        showUserInfo={false}
        enableTilt={true}
        enableMobileTilt={false}
        onContactClick={() => console.log('Contact clicked')}
        behindGlowEnabled={true}
        innerGradient="linear-gradient(
          145deg,
          hsla(51, 85%, 58%, 0.8) 0%,
          hsla(51, 75%, 48%, 0.55) 45%,
          hsla(51, 65%, 32%, 0.25) 100%
        )"
        behindGlowColor="hsla(51, 80%, 55%, 0.45)"
        behindGlowSize={undefined}
        miniAvatarUrl={undefined}
        avatarStyle={{ top: 'unset', bottom: '0px', transform: 'translateX(-50%)', width: '180%' }}
      />

      <ProfileCard
        name="Imon Mukherjee"
        title="Marketing Team"
        handle="imon"
        status="Online"
        contactText="Contact Me"
        avatarUrl={imonImg.src}
        iconUrl={iconPattern.src}
        grainUrl={grainImg.src}
        showUserInfo={false}
        enableTilt={true}
        enableMobileTilt={false}
        onContactClick={() => console.log('Contact clicked')}
        behindGlowEnabled={true}
        innerGradient="linear-gradient(
          145deg,
          hsla(51, 85%, 58%, 0.8) 0%,
          hsla(51, 75%, 48%, 0.55) 45%,
          hsla(51, 65%, 32%, 0.25) 100%
        )"
        behindGlowColor="hsla(51, 80%, 55%, 0.45)"
        behindGlowSize={undefined}
        miniAvatarUrl={undefined}
        avatarStyle={{ top: 'unset', bottom: '0px', transform: 'translateX(-50%)', width: '90%' }}
      />
      </div>
      
      {/* Bottom marker for height calculation */}
      <div className="iframe-bottom-marker" style={{ height: '1px', width: '100%' }}></div>
    </div>
  );
}
