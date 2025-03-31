Pod::Spec.new do |s|
    s.name         = 'NotificationModule'
    s.version      = '1.0.0'
    s.summary      = 'Notification module for React Native'
    s.homepage     = 'https://brytoz.netlify.app'
    s.license      = { :type => 'MIT' }
    s.authors      = { 'Your Name' => 'brytozee@gmail.com' }
    s.platform     = :ios, '12.0'
    s.source       = { :git => '' }
    s.source_files = 'ios/*.{h,m,swift}'
    s.dependency 'React-Core'
  end