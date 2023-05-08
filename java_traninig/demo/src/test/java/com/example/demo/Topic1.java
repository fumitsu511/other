package com.example.demo;

import java.io.File;
import java.io.FileFilter;
import java.util.Arrays;
import java.util.function.Consumer;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class Topic1 {

	private static final String PATH_NAME = "C:/Users/fumiy/Desktop/TRANING/other/other/java_traninig/demo/resource/fruit";

	private Consumer<String> initSysOut = methodName ->{
		System.out.println("_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/");
		System.out.println(methodName);
	};

	

	@Test
	@DisplayName("FileFilterでラムダの確認")
	void chapter2_1 () {
		initSysOut.accept(new Object(){}.getClass().getEnclosingMethod().getName());
		File file = new File(PATH_NAME);
		File[] fileList = file.listFiles(f -> !f.isDirectory());
		Arrays.asList(fileList).stream().forEach(System.out::println);

	}

	@Test
	@DisplayName("FileFilterでラムダの確認（匿名メソッド）")
	void chapter2_2 () {
		initSysOut.accept(new Object(){}.getClass().getEnclosingMethod().getName());
		File file = new File(PATH_NAME);

		// FileFileterインターフェースをインスタンス化して使用
		FileFilter fileFilter = new FileFilter() {
			@Override
			public boolean accept(File pathname) {
				return !pathname.isDirectory();
			}
		};
		File[] fileList = file.listFiles(fileFilter);
		Arrays.asList(fileList).stream().forEach(System.out::println);


		initSysOut.accept(new Object(){}.getClass().getEnclosingMethod().getName());
		File[] fileList2 = file.listFiles((f) -> fileFilter.accept(f));
		Arrays.asList(fileList2).stream().forEach(System.out::println);


		initSysOut.accept(new Object(){}.getClass().getEnclosingMethod().getName());
		File[] fileList3 = file.listFiles((f) -> {return !f.isDirectory();});
		Arrays.asList(fileList3).stream().forEach(System.out::println);
	}

//FileFilterインターフェースは、acceptという関数のみ持っているため、
//記載を省略が可能

//　↓参考：FileFileterインターフェース

// 	@FunctionalInterface
// public interface FileFilter {

//     /**
//      * Tests whether or not the specified abstract pathname should be
//      * included in a pathname list.
//      *
//      * @param  pathname  The abstract pathname to be tested
//      * @return  {@code true} if and only if {@code pathname}
//      *          should be included
//      */
//     boolean accept(File pathname);
// }


private static final String EXTENTION = ".txt";

@Test
@DisplayName("拡張子でのファイル取得")
void chapter3_1 () {
	initSysOut.accept(new Object(){}.getClass().getEnclosingMethod().getName());
	File file = new File(PATH_NAME);
	File[] fileList = file.listFiles(f -> f.getName().endsWith(EXTENTION));
	Arrays.asList(fileList).stream().forEach(System.out::println);

}






}
