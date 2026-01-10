import React from 'react'
import { withBase } from '../../utils/asset'
import './DevicePreview.css'

const DevicePreview = ({ data, title }) => {
  const { pc, mobile } = data || {}

  return (
    <section className="section section--gray device-preview">
      <div className="container">
        <div className="device-preview__wrapper">
          {/* 데스크탑 모니터 */}
          <div className="device-preview__monitor">
            <div className="monitor">
              <div className="monitor__body">
                <div className="monitor__screen">
                  {pc ? (
                    <img src={withBase(pc)} alt={`${title} PC 버전`} loading="lazy" decoding="async" />
                  ) : (
                    <div className="monitor__placeholder"><span>PC</span></div>
                  )}
                </div>
                <div className="monitor__chin">
                  <div className="monitor__logo" />
                </div>
              </div>
              <div className="monitor__stand">
                <div className="monitor__neck" />
                <div className="monitor__base" />
              </div>
            </div>
          </div>

          {/* iPhone 스타일 */}
          <div className="device-preview__phone">
            <div className="iphone">
              <div className="iphone__frame">
                <div className="iphone__button iphone__button--silent" />
                <div className="iphone__button iphone__button--volume-up" />
                <div className="iphone__button iphone__button--volume-down" />
                <div className="iphone__button iphone__button--power" />
                
                <div className="iphone__screen">
                  <div className="iphone__dynamic-island" />
                  {mobile ? (
                    <img src={withBase(mobile)} alt={`${title} 모바일 버전`} loading="lazy" decoding="async" />
                  ) : (
                    <div className="iphone__placeholder"><span>Mobile</span></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DevicePreview
