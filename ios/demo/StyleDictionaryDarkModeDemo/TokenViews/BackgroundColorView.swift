//
//  BackgroundView.swift
//  StyleDictionaryDarkModeDemo
//
//  Created by Banks, Daniel on 3/19/21.
//  Copyright © 2021 Amazon. All rights reserved.
//

import Foundation
import SwiftUI
import StyleDictionaryDarkMode

struct BackgroundRow: View {
    var label: String
    var color: Color

    var body: some View {
        HStack {
            ZStack {
                Rectangle()
                    .fill(color)
                    .frame(width: 50, height: 50)
            }.border(Color.fontPrimary)
            Spacer()
        }
    }
}

struct BackgroundColorView: View {
    var body: some View {
        ZStack {
            ScrollView {
                VStack {
                    Group {
                        BackgroundRow(label:"Primary", color:Color.backgroundPrimary)
                        BackgroundRow(label:"Interactive", color:Color.backgroundInteractive)
                    }
                }
            }
        }
        .navigationBarTitle("Background Colors")
        .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity)
        .background(Color.backgroundPrimary)
    }
}

struct BackgroundColorView_Previews: PreviewProvider {
    static var previews: some View {
        BackgroundColorView()
    }
}

