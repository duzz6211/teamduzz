import React from 'react'
import { Link } from 'react-router-dom'
import { withBase } from '../utils/asset'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        {/* 상단 영역 */}
        <div className="footer__top">
          {/* 브랜드 & 설명 */}
          <div className="footer__brand-section">
            <Link to="/" className="footer__logo">
              <img 
                src={withBase('images/DUZZ_logo.png')} 
                alt="TeamDuzz" 
                className="footer__logo-img"
              />
              <span className="footer__logo-text">TeamDuzz</span>
            </Link>
            <p className="footer__description">
              웹 개발, 홈페이지 제작, 웹사이트 유지보수까지<br />
              비즈니스 성장을 위한 디지털 파트너
            </p>
          </div>

          {/* 링크 그룹들 */}
          <div className="footer__links-group">
            <div className="footer__links-col">
              <h4 className="footer__links-title">Services</h4>
              <ul className="footer__links">
                <li><span>웹 개발</span></li>
                <li><span>홈페이지 제작</span></li>
                <li><span>웹사이트 유지보수</span></li>
                <li><span>관리자 페이지 개발</span></li>
              </ul>
            </div>

            <div className="footer__links-col">
              <h4 className="footer__links-title">Quick Links</h4>
              <ul className="footer__links">
                <li><Link to="/">메인</Link></li>
                <li><Link to="/portfolio">포트폴리오</Link></li>
                <li><Link to="/contact">문의하기</Link></li>
              </ul>
            </div>

            <div className="footer__links-col">
              <h4 className="footer__links-title">Contact</h4>
              <ul className="footer__links footer__contact-list">
                <li>
                  <span className="footer__contact-label">Email</span>
                  <a href="mailto:support@teamduzz.com">support@teamduzz.com</a>
                </li>
                <li>
                  <span className="footer__contact-label">Phone</span>
                  <a href="tel:010-7656-7010">010 7656 7010</a>
                </li>
                <li>
                  <span className="footer__contact-label">Kakao</span>
                  <a href="http://pf.kakao.com/_kJxbQn" target="_blank" rel="noopener noreferrer">@duzz</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="footer__divider"></div>

        {/* 하단 영역 */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} TeamDuzz. All rights reserved.
          </p>
          <p className="footer__legal">
            프로젝트 문의부터 유지보수까지, 신뢰할 수 있는 개발 파트너
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
