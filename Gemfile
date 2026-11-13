# frozen_string_literal: true

source "https://rubygems.org"

gem "jekyll-theme-chirpy", "~> 7.4", ">= 7.4.1"

gem "html-proofer", "~> 5.0", group: :test

# Ruby 3.4 no longer ships these as default gems, but Jekyll still requires them.
gem "erb"
gem "csv"
gem "base64"
gem "bigdecimal"
gem "logger"

platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.2.0", :platforms => [:mingw, :x64_mingw, :mswin]
