import React from 'react'
import { withBase } from '../../utils/asset'
import './DevicePreview.css'

const DevicePreview = ({ data, title }) => {
  const { pc, mobile } = data || {}

  return (
    <section className="section section--gray device-preview">
      <div className="container">
        <div className="device-preview__wrapper">
          <div className="device-preview__monitor">
            <div className="monitor__frame">
              <div className="monitor__screen">
                {pc ? (
                  <img src={withBase(pc)} alt={`${title} PC 버전`} loading="lazy" decoding="async" />
                ) : (
                  <div className="monitor__placeholder"><span>PC</span></div>
                )}
              </div>
              <div className="monitor__chin" />
            </div>
            <div className="monitor__stand">
              <div className="monitor__neck" />
              <div className="monitor__base" />
            </div>
          </div>

          <div className="device-preview__phone">
            <div className="phone__frame">
              <div className="phone__notch" />
              <div className="phone__screen">
                {mobile ? (
                  <img src={withBase(mobile)} alt={`${title} 모바일 버전`} loading="lazy" decoding="async" />
                ) : (
                  <div className="phone__placeholder"><span>Mobile</span></div>
                )}
              </div>
              <div className="phone__home" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DevicePreview

